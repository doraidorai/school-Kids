const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/demoDB');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(

        'Access-Control-Allow-Headers',

        'Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn'

    );

    res.setHeader(

        'Access-Control-Allow-Methods',

        'GET, POST, DELETE, OPTIONS, PATCH, PUT'

    );

    next();

});

app.use("/myFiles", express.static(path.join("backend/media")));
const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "application/pdf": "pdf",
};
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, "backend/media");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + "-" + Date.now() + "." + extension;
        cb(null, imgName);
    },
});




//Models imports Start
const User = require('./models/user');
const Course = require('./models/course');
const AssignInfo = require('./models/assignInfo');
const Note = require('./models/note');
const Event = require('./models/event');
//Models imports End




//BL Start
app.post("/api/user/signup", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log('here into BL signup', req.body);
    User.findOne({ tel: req.body.tel }).then((doc) => {
        if (doc) {
            res.json({ msg: '1' });
        } else {
            if (req.body.role == 'parent') {
                User.findOne({ tel: req.body.telSon }).then((doc) => {
                    if (doc && doc.role == 'student') {
                        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
                            req.body.pwd = cryptedPwd;
                            if (req.file) {
                                req.body.avatar = 'http://localhost:3000/myFiles/' + req.file.filename;
                            }
                            let user = new User(req.body);
                            user.save(
                                (err, doc) => {
                                    if (err) {
                                        res.json({ msg: 'false' });
                                    } else {
                                        res.json({ msg: 'true' });
                                    }
                                }
                            );
                        })
                    } else {
                        res.json({ msg: 'telSonMisMatch' })
                    }
                })
            } else {
                bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
                    req.body.pwd = cryptedPwd;
                    if (req.file) {
                        req.body.avatar = 'http://localhost:3000/myFiles/' + req.file.filename;
                    }
                    let user = new User(req.body);
                    user.save(
                        (err, doc) => {
                            if (err) {
                                res.json({ msg: 'false' });
                            } else {
                                res.json({ msg: 'true' });
                            }
                        }
                    );
                })
            }
        }
    });
});

app.post("/api/user/login", (req, res) => {
    // console.log('here into BL login', req.body);
    let user;

    User.findOne({ tel: req.body.tel }).then((doc) => {
        user = doc;

        if (!doc) {
            res.json({ msg: 'decline' })
        } else {
            return bcrypt.compare(req.body.pwd, doc.pwd)
        }
    }).then((checkPwd) => {
        if (!checkPwd) {
            res.json({ msg: 'decline' })
        } else if (user.role == 'teacher' && user.status == 'notOk') {
            res.json({ msg: 'declineStatus' })
        } else {
            let userToSend = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                tel: user.tel,
                address: user.address,
                about: user.about,
                role: user.role,
                avatar: user.avatar,
            };
            res.json({ msg: 'accept', connectedUser: userToSend });
        }
    })
});

app.post("/api/user/signupTeacher", multer({ storage: storageConfig }).fields([
    { name: 'img' },
    { name: 'cv' }
]), (req, res) => {
    console.log('here into BL signup', req.body);
    User.findOne({ tel: req.body.tel }).then((doc) => {
        if (doc) {
            res.json({ msg: '1' });
        } else {
            bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
                req.body.pwd = cryptedPwd;
                if (req.files['img']) {
                    req.body.avatar = 'http://localhost:3000/myFiles/' + req.files['img'][0].filename;
                }
                if (req.files['cv']) {
                    req.body.cv = 'http://localhost:3000/myFiles/' + req.files['cv'][0].filename;
                }
                let user = new User(req.body);
                user.save(
                    (err, doc) => {
                        if (err) {
                            res.json({ msg: 'false' });
                        } else {
                            res.json({ msg: 'true' });
                        }
                    }
                );
            })
        }
    });
});

//BL Users(teachers/students/parents/admin)
app.get('/api/user/getAllTeachers', (req, res) => {
    User.find({ role: 'teacher' }).then(
        (doc) => { res.json({ teachers: doc }) }
    )
});
app.get('/api/user/getAllStudents', (req, res) => {
    User.find({ role: 'student' }).then(
        (doc) => { res.json({ students: doc }) }
    )
});
app.get('/api/user/getAllParents', (req, res) => {
    User.find({ role: 'parent' }).then(
        (doc) => { res.json({ parents: doc }) }
    )
});
app.put('/api/user/acceptTeacher', (req, res) => {
    let updatedTeacher = req.body;
    console.log('here updated teacher ', req.body)
    User.updateOne({ _id: req.body._id }, updatedTeacher).then(
        (response) => {
            console.log('response after update', response)

            if (response.nModified == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        })
});
app.delete('/api/user/deleteTeacher/:id', (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }).then(
        (response) => {
            console.log('here response after delete', response);
            if (response.deletedCount == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    );
});
app.delete('/api/user/deleteStudent/:id', (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }).then(
        (response) => {
            console.log('here response after delete', response);
            if (response.deletedCount == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    );
});
app.delete('/api/user/deleteParent/:id', (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }).then(
        (response) => {
            console.log('here response after delete', response);
            if (response.deletedCount == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    );
});
app.patch('/api/user/profileUpdate', multer({ storage: storageConfig }).single('img'), (req, res) => {
    if (req.file) {
        req.body.avatar = 'http://localhost:3000/myFiles/' + req.file.filename;
    }
    if (req.body.pwd) {
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            User.updateOne({ _id: req.body.id }, req.body).then((response) => {
                if (response.nModified == 1) {
                    res.json({ msg: true });
                } else {
                    res.json({ msg: false });
                }
            })
        });
    } else {
        User.updateOne({ _id: req.body.id }, req.body).then((response) => {
            if (response.nModified == 1) {
                res.json({ msg: true });
            } else {
                res.json({ msg: false });
            }
        })
    }
});
app.patch('/api/user/saveStudentNote', (req, res) => {
    User.updateOne({ _id: req.body.id }, req.body).then((response) => {
        if (response.nModified == 1) {
            res.json({ msg: true });
        } else {
            res.json({ msg: false });
        }
    })
}
);


// BL couses
app.post("/api/course/courseSave", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log('here into BL signup', req.body);
    if (req.file) {
        req.body.img = 'http://localhost:3000/myFiles/' + req.file.filename;
    }
    let course = new Course(req.body);
    course.save(
        (err, doc) => {
            if (err) {
                res.json({ msg: false });
            } else {
                res.json({ msg: true });
            }
        }
    );
});
app.get('/api/course/getCoursesById/:id', (req, res) => {
    let id = req.params.id;
    Course.find({ teacherId: id }).then(
        (doc) => { res.json({ courses: doc }) }
    )
});
app.delete('/api/course/deleteCourse/:id', (req, res) => {
    let id = req.params.id;
    console.log('here course id', id);
    Course.deleteOne({ _id: id }).then(
        (response) => {
            console.log('here response after delete', response);
            if (response.deletedCount == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    );
});
app.patch('/api/course/courseUpdate', multer({ storage: storageConfig }).single('img'), (req, res) => {
    if (req.file) {
        req.body.img = 'http://localhost:3000/myFiles/' + req.file.filename;
    }
    Course.updateOne({ _id: req.body.id }, req.body).then((response) => {
        if (response.nModified == 1) {
            res.json({ msg: true });
        } else {
            res.json({ msg: false });
        }
    })
});
app.get('/api/course/getAllCourses/', (req, res) => {
    Course.find().then(
        (doc) => { res.json({ courses: doc }) }
    )
});
//BL AssigInfo
app.post("/api/course/saveAssignInfo", (req, res) => {
    console.log('here obj Assign info', req.body);
    let assignInfo = new AssignInfo(req.body);
    assignInfo.save(
        (err, doc) => {
            if (err) {
                res.json({ msg: false });
            } else {
                res.json({ msg: true });
            }
        }
    );
});
app.get('/api/course/getAssignInfo', (req, res) => {
    AssignInfo.find().then(
        (doc) => { res.json({ assignInfo: doc }) }
    )
});
// BL notes
app.post("/api/user/saveStudentNote", (req, res) => {
    let note = new Note(req.body);
    note.save(
        (err, doc) => {
            if (err) {
                res.json({ msg: false });
            } else {
                res.json({ msg: true });
            }
        }
    );
});
app.get('/api/user/getAllNotes/', (req, res) => {
    Note.find().then(
        (doc) => { res.json({ notes: doc }) }
    )
});
//BL Events
app.post("/api/user/addEvent", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log('here into BL signup', req.body);
    if (req.file) {
        req.body.img = 'http://localhost:3000/myFiles/' + req.file.filename;
    }
    let event = new Event(req.body);
    event.save(
        (err, doc) => {
            if (err) {
                res.json({ msg: false });
            } else {
                res.json({ msg: true });
            }
        }
    );
});
app.get('/api/user/getEvents/', (req, res) => {
    Event.find().then(
        (doc) => { res.json({ events: doc }) }
    )
});






//BL End
module.exports = app;