var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./logger');

//remove all residencies and students from SASmongodb.js
//change mongoose on sasmongodb to createConnection(..sasdb)
//replace all node modules
var app = express();
var users = require('./routes/users');
var roleCodes = require('./routes/roleCodes');
var userRoles = require('./routes/usersRoles');
var rolePermissions = require('./routes/rolePermissions');
var passwords = require('./routes/passwords');
var logins = require('./routes/logins');
var roots = require('./routes/roots');

mongoose.connect('mongodb://localhost/sasdb');

var app = express();

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(logger);

app.use('/users', users);
app.use('/roleCodes', roleCodes);
app.use('/userRoles', userRoles);
app.use('/rolePermissions', rolePermissions);
app.use('/passwords', passwords);
app.use('/logins', logins);
app.use('/roots', roots);



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static('public'));

var studentsSchema = mongoose.Schema(
{
    number: String,
    firstName: String,
    lastName: String,
    DOB: String,
    resInfo: {type: mongoose.Schema.ObjectId, ref: 'ResidencyModel'},
    gender: {type: mongoose.Schema.ObjectId, ref: 'GenderModel'},
    country: {type: mongoose.Schema.ObjectId, ref: 'CountryModel'},
    province: {type: mongoose.Schema.ObjectId, ref: 'ProvinceModel'},
    city: {type: mongoose.Schema.ObjectId, ref: 'CityModel'},
    academicload: {type: mongoose.Schema.ObjectId, ref: 'AcademicloadModel'},
    grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}],
    distributionresults: [{type: mongoose.Schema.ObjectId, ref: ('DistributionresultModel')}],
    itrprograms: [{type: mongoose.Schema.ObjectId,ref: 'ItrprogramModel'}],

    // ADDED MM
    hSchool: [{type: mongoose.Schema.ObjectId, ref: ('SecondaryschoolModel')}],
    awardInfo: [{type: mongoose.Schema.ObjectId, ref: ('ScholarandawardcodeModel')}],
    highschooladmissionaverage: {type: mongoose.Schema.ObjectId, ref: 'HighschooladmissionaverageModel'},
    admBase: [{type: mongoose.Schema.ObjectId, ref: ('BasisofadmissionModel')}]
    // END ADDED MM
}
);
var residencySchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var genderSchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var countrySchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}],
    provinces: [{type: mongoose.Schema.ObjectId, ref: ('ProvinceModel')}]
}
);
var provinceSchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}],
    country: {type: mongoose.Schema.ObjectId, ref: 'CountryModel'},
    cities: [{type: mongoose.Schema.ObjectId, ref: ('CityModel')}]
}
);
var citySchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}],
    province: {type: mongoose.Schema.ObjectId, ref: 'ProvinceModel'}
}
);
var academicloadSchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var gradeSchema = mongoose.Schema(
{
    mark: String,
    section: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    coursecode: {type: mongoose.Schema.ObjectId, ref: 'CoursecodeModel'},
    programrecord: {type: mongoose.Schema.ObjectId, ref: 'ProgramrecordModel'}
}
);
var coursecodeSchema = mongoose.Schema(
{
    code: String,
    number: String,
    name: String,
    unit: String,
    grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}]
}
);
var programrecordSchema = mongoose.Schema(
{
    level: String,
    status: String,
    comment: String,
    grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}],
    degreecode: {type: mongoose.Schema.ObjectId, ref: 'DegreecodeModel'},
    termcode: {type: mongoose.Schema.ObjectId, ref: 'TermcodeModel'}
}
);
var degreecodeSchema = mongoose.Schema(
{
    name: String,
    programrecords: [{type: mongoose.Schema.ObjectId, ref: ('ProgramrecordModel')}]
}
);
var termcodeSchema = mongoose.Schema(
{
    name: String,
    programrecords: [{type: mongoose.Schema.ObjectId, ref: ('ProgramrecordModel')}]
}
);
var distributionresultSchema = mongoose.Schema(
{
    date: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    commentcodes: [{type: mongoose.Schema.ObjectId, ref: ('CommentcodeModel')}]
}
);
var commentcodeSchema = mongoose.Schema(
{
    code: String,
    progaction: String,
    description: String,
    notes: String,
    distributionresult: {type: mongoose.Schema.ObjectId, ref: 'DistributionresultModel'}
}
);
var itrprogramSchema = mongoose.Schema(
{
    order: String,
    eligibility: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    academicprogramcode: {type:mongoose.Schema.ObjectId, ref: 'AcademicprogramcodeModel'}
}
);
var academicprogramcodeSchema = mongoose.Schema(
{
    name: String,
    itrprogram: {type:mongoose.Schema.ObjectId, ref: 'ItrprogramModel'},
    programadministrations: [{type: mongoose.Schema.ObjectId, ref: ('ProgramadministrationModel')}],
    admissionrule: {type:mongoose.Schema.ObjectId, ref: 'AdmissionruleModel'},
}
);
var programadministrationSchema = mongoose.Schema(
{
    name: String,
    position: String,
    academicprogramcode: {type:mongoose.Schema.ObjectId, ref: 'AcademicprogramcodeModel'},
    department: {type:mongoose.Schema.ObjectId, ref: 'DepartmentModel'},
}
);
var departmentSchema = mongoose.Schema(
{
    name: String,
    faculty: {type:mongoose.Schema.ObjectId, ref: 'FacultyModel'},
    programadministrations: [{type: mongoose.Schema.ObjectId, ref: ('ProgramadministrationModel')}]
}
);
var facultySchema = mongoose.Schema(
{
    name: String,
    department: [{type: mongoose.Schema.ObjectId, ref: ('DepartmentModel')}]
}
);
var admissionruleSchema = mongoose.Schema(
{
    description: String,
    academicprogramcodes: [{type: mongoose.Schema.ObjectId, ref: ('AdademicprogramcodeModel')}],
    logicalexpressions: [{type: mongoose.Schema.ObjectId, ref: ('LogicalexpressionModel')}]
}
);
var logicalexpressionSchema = mongoose.Schema(
{
    booleanExp: String,
    logicalLink: String,
    admissionrule: {type:mongoose.Schema.ObjectId, ref: 'admissionrule'}
}
);

// ADDED MM
var secondaryschoolSchema = mongoose.Schema(
{
    name: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    highschoolcoursesmarks: [{type: mongoose.Schema.ObjectId, ref: ('HighschoolcoursesmarkModel')}]
}
);
var highschoolcoursesmarksSchema = mongoose.Schema(
{
    level: String,
    source: String,
    unit: String,
    grade: String,
    secondaryschool: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    highschoolsubject: {type: mongoose.Schema.ObjectId, ref: 'HighschoolsubjectModel'},
}
);
var highschoolsubjectSchema = mongoose.Schema(
{
    name: String,
    description: String,
    highschoolcoursesmarks: [{type: mongoose.Schema.ObjectId, ref: ('HighschoolcoursesmarkModel')}]
}
);
var scholarandawardcodeSchema = mongoose.Schema(
{
    name: String,
    student: {type: mongoose.Schema.ObjectId, ref: 'ScholarandawardcodeModel'}
}
);

var highschooladmissionaverageSchema = mongoose.Schema(
{
    first: String,
    midYear: String,
    _final: String,
    grade11: String,
    student: {type:mongoose.Schema.ObjectId, ref: 'student'}
}
);
var basisofadmissionSchema = mongoose.Schema(
{
    date: String,
    comment: String,
    student: {type:mongoose.Schema.ObjectId, ref: 'student'},
    basisCode: {type:mongoose.Schema.ObjectId, ref: 'basisofadmissioncode'}
}
);
var basisofadmissioncodeSchema = mongoose.Schema(
{
    name: String,
    basisofadmission: {type:mongoose.Schema.ObjectId, ref: 'basisofadmission'} 
});
// END ADDED MM

/*ADDED ALAN*/
/*var usersSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        enabled: Boolean,
        userShadow: {type: mongoose.Schema.ObjectId, ref: ('PasswordsModel')},
        userRoles: [{type: mongoose.Schema.ObjectId, ref: 'UserRoleModel'}]
    }
);
var passwordSchema = mongoose.Schema(
    {
        userName: String,
        salt: String,
        encryptedPassword: String,
        userAccountExpiryDate: Date,
        passwordMustChanged : Boolean,
        passwordReset: Boolean,
        user: {type: mongoose.Schema.ObjectId, ref: ('UsersModel')}
    }
);
var loginSchema = mongoose.Schema(
    {
        userName: String,
        password: String,
        nonce: String,
        response: String,
        token: String,
        requestType: String,
        wrongUserName: Boolean,
        wrongPassword: Boolean,
        passwordMustChanged: Boolean,
        passwordReset: Boolean,
        loginFailed: Boolean,
        sessionIsActive: Boolean
    }
);
var rootSchema = mongoose.Schema(
    {
        password: String,
        nonce: String,
        response: String,
        wrongPassword: Boolean,
        sessionIsActive: Boolean
    }
);
var userRoleSchema = mongoose.Schema(
    {
        dateAssigned: Date,
        user: {type: mongoose.Schema.ObjectId, ref: ('UsersModel')},
        role: {type: mongoose.Schema.ObjectId, ref: ('RoleCodeModel')}
    }
);
var roleCodeSchema = mongoose.Schema(
    {
        name: String,
        userRoles: [{type: mongoose.Schema.ObjectId, ref: 'UserRoleModel'}],
        features: [{type: mongoose.Schema.ObjectId, ref: 'RolePermissionModel'}]
    }
);
var rolePermissionSchema = mongoose.Schema(
    {
        code: String,
        sysFeature: String,
        roleCodes: [{type: mongoose.Schema.ObjectId, ref: ('RoleCodeModel')}]
    }
);*/
/*END ADDED ALAN*/



var StudentsModel = mongoose.model('student', studentsSchema);
var ResidencyModel = mongoose.model('residency', residencySchema);
var GenderModel = mongoose.model('gender', genderSchema);
var CountryModel = mongoose.model('country', countrySchema);
var ProvinceModel = mongoose.model('province', provinceSchema);
var CityModel = mongoose.model('city', citySchema);
var AcademicloadModel = mongoose.model('academicload', academicloadSchema);
var GradeModel = mongoose.model('grade', gradeSchema);
var CoursecodeModel = mongoose.model('coursecode', coursecodeSchema);
var ProgramrecordModel = mongoose.model('programrecord', programrecordSchema);
var DegreecodeModel = mongoose.model('degreecode', degreecodeSchema);
var TermcodeModel = mongoose.model('termcode', termcodeSchema);
var DistributionresultModel = mongoose.model('distributionresult', distributionresultSchema);
var CommentcodeModel = mongoose.model('commentcode', commentcodeSchema);
var AcademicprogramcodeModel = mongoose.model('academicprogramcode', academicprogramcodeSchema);
var ItrprogramModel = mongoose.model('itrprogram', itrprogramSchema);
var ProgramadministrationModel = mongoose.model('programadministration', programadministrationSchema);
var FacultyModel = mongoose.model('faculty', facultySchema);
var DepartmentModel = mongoose.model('department', departmentSchema);
var AdmissionruleModel = mongoose.model('admissionrule', admissionruleSchema);
var LogicalexpressionModel = mongoose.model('logicalexpression', logicalexpressionSchema);

// ADDED MM
var SecondaryschoolModel = mongoose.model('secondaryschool', secondaryschoolSchema);
var HighschoolcoursesmarkModel = mongoose.model('highschoolcoursesmark', highschoolcoursesmarksSchema);
var HighschoolsubjectModel = mongoose.model('highschoolsubject', highschoolsubjectSchema);
var ScholarandawardcodeModel = mongoose.model('scholarandawardcode', scholarandawardcodeSchema);
var HighschooladmissionaverageModel = mongoose.model('highschooladmissionaverage', highschooladmissionaverageSchema);
var BasisofadmissionModel = mongoose.model('basisofadmission', basisofadmissionSchema);
var BasisofadmissioncodeModel = mongoose.model('basisofadmissioncode',basisofadmissioncodeSchema);
// END ADDED MM

app.route('/students')
.post(function (request, response) {
    var student = new StudentsModel(request.body.student);
    student.save(function (error) {
        if (error) response.send(error);
        response.json({student: student});
    });
})
.get(function (request, response) {
    var Student = request.query.student;
    if (!Student) {
        StudentsModel.find(function (error, students) {
            if (error) response.send(error);
            response.json({student: students});
        });
    }
// } else {
//     if (Student == "grade"){
//         StudentsModel.find({"grade": request.query.grade}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
//     else if (Student == "residency"){
//         StudentsModel.find({"residency": request.query.residency}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
//     else if(Student == "gender"){
//         StudentsModel.find({"gender": request.query.gender}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
//     else if(Student == "country"){
//         StudentsModel.find({"country": request.query.country}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
//     else if(Student == "province"){
//         StudentsModel.find({"province": request.query.province}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
//     else if(Student == "city"){
//         StudentsModel.find({"city": request.query.city}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
//     else if(Student == "academicload"){
//         StudentsModel.find({"academicload": request.query.academicload}, function (error, students) {
//             if (error) response.send(error);
//             response.json({student: students});
//         });
//     }
// }
});

app.route('/students/:student_id')
.get(function (request, response) {
    StudentsModel.findById(request.params.student_id, function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({student: student});
        }
    });
})
.put(function (request, response) {
    StudentsModel.findById(request.params.student_id, function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            student.number = request.body.student.number;
            student.firstName = request.body.student.firstName;
            student.lastName = request.body.student.lastName;
            student.DOB = request.body.student.DOB;
            student.resInfo = request.body.student.resInfo;
            student.gender = request.body.student.gender;
            student.country = request.body.student.country;
            student.province = request.body.student.province;
            student.city = request.body.student.city;
            student.academicload = request.body.student.academicload;

            student.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({student: student});
                }
            });
        }
    });
})
.delete(function (request, response) {
    StudentsModel.findByIdAndRemove(request.params.student_id,
        function (error, deleted) {
            if (!error) {
                response.json({student: deleted});
            };
        }
        );
});

app.route('/grades')
.post(function (request, response) {
    var grade = new GradeModel(request.body.grade);
    grade.save(function (error) {
        if (error) response.send(error);
        response.json({grade: grade});
    });
})
.get(function (request, response) {
    var Grade = request.query.grade;
    var mark = request.query.mark;
    var student = request.query.student;
    console.log(Grade);
    console.log(mark);
    console.log(student);

    if (student) {
        GradeModel.find({"student": student}, function (error, grades) {
            if (error) response.send(error);
            response.json({grade: grades});
        });
    }
    else if (mark) {
        GradeModel.find({"mark": mark}, function (error, grades) {
            if (error) response.send(error);
            response.json({grade: grades});
        });
    }
    else {
        GradeModel.find(function (error, grades) {
            if (error) response.send(error);
            response.json({grade: grades});
        });
    }
});

//         StudentsModel.find({"grade": request.query.grade}, function (error, students) {


    app.route('/grades/:grade_id')
    .get(function (request, response) {
        GradeModel.findById(request.params.grade_id, function (error, grade) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({grade: grade});
            }
        });
    })
    .put(function (request, response) {
        GradeModel.findById(request.params.grade_id, function (error, grade) {
            if (error) {
                response.send({error: error});
            }
            else {
                grade.mark = request.body.grade.mark;
                grade.section = request.body.grade.section;
                grade.student = request.body.grade.student;
                grade.coursecode = request.body.grade.coursecode;
                grade.programrecord = request.body.grade.programrecord;

                grade.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({grade: grade});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        GradeModel.findByIdAndRemove(request.params.grade_id,
            function (error, deleted) {
                if (!error) {
                    response.json({grade: deleted});
                };
            }
            );
    });

app.route('/coursecodes')
.post(function (request, response) {
    var coursecode = new CoursecodeModel(request.body.coursecode);
    coursecode.save(function (error) {
        if (error) response.send(error);
        response.json({coursecode: coursecode});
    });
})
.get(function (request, response) {
    var Grade = request.query.filter;
    if (!Grade) {
        CoursecodeModel.find(function (error, coursecodes) {
            if (error) response.send(error);
            response.json({coursecode: coursecodes});
        });
    } else {
        PermissionTypeModel.find({"grade": Grade.grade}, function (error, grades) {
            if (error) response.send(error);
            response.json({coursecode: grades});
        });
    }
});

app.route('/coursecodes/:coursecode_id')
.get(function (request, response) {
    CoursecodeModel.findById(request.params.coursecode_id, function (error, coursecode) {
        if (error) response.send(error);
        response.json({coursecode: coursecode});
    })
})
.put(function (request, response) {
    CoursecodeModel.findById(request.params.coursecode_id, function (error, coursecode) {
        if (error) {
            response.send({error: error});
        }
        else {
            coursecode.code = request.body.coursecode.code;
            coursecode.number = request.body.coursecode.number;
            coursecode.name = request.body.coursecode.name;
            coursecode.unit = request.body.coursecode.unit;
            coursecode.grades = request.body.coursecode.grades;

            coursecode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({coursecode: coursecode});
                }
            });
        }
    })
})
.delete(function (request, response) {
    CoursecodeModel.findByIdAndRemove(request.params.coursecode_id,
        function (error, deleted) {
            if (!error) {
                response.json({coursecode: deleted});
            };
        }
        );
});;

app.route('/programrecords')
.post(function (request, response) {
    var programrecord = new ProgramrecordModel(request.body.programrecord);
    programrecord.save(function (error) {
        if (error) response.send(error);
        response.json({programrecord: programrecord});
    });
})
.get(function (request, response) {
    var Programrecord = request.query.programrecord;
    if (!Programrecord) {
        ProgramrecordModel.find(function (error, programrecords) {
            if (error) response.send(error);
            response.json({programrecord: programrecords});
        });
    }
});

app.route('/programrecords/:programrecord_id')
.get(function (request, response) {
    ProgramrecordModel.findById(request.params.programrecord_id, function (error, programrecord) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programrecord: programrecord});
        }
    });
})
.put(function (request, response) {
    ProgramrecordModel.findById(request.params.programrecord_id, function (error, programrecord) {
        if (error) {
            response.send({error: error});
        }
        else {
            programrecord.level = request.body.programrecord.level;
            programrecord.status = request.body.programrecord.status;
            programrecord.comment = request.body.programrecord.comment;
            programrecord.degreecode = request.body.programrecord.degreecode;
            programrecord.termcode = request.body.programrecord.termcode;

            programrecord.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({programrecord: programrecord});
                }
            });
        }
    });
})
.delete(function (request, response) {
    ProgramrecordModel.findByIdAndRemove(request.params.programrecord_id,
        function (error, deleted) {
            if (!error) {
                response.json({programrecord: deleted});
            };
        }
        );
});

app.route('/degreecodes')
.post(function (request, response) {
    var degreecode = new DegreecodeModel(request.body.degreecode);
    degreecode.save(function (error) {
        if (error) response.send(error);
        response.json({degreecode: degreecode});
    });
})
.get(function (request, response) {
    var Programrecord = request.query.filter;
    if (!Programrecord) {
        DegreecodeModel.find(function (error, degreecodes) {
            if (error) response.send(error);
            response.json({degreecode: degreecodes});
        });
    } else {
        PermissionTypeModel.find({"programrecord": Programrecord.programrecord}, function (error, programrecords) {
            if (error) response.send(error);
            response.json({degreecode: programrecords});
        });
    }
});

app.route('/degreecodes/:degreecode_id')
.get(function (request, response) {
    DegreecodeModel.findById(request.params.degreecode_id, function (error, degreecode) {
        if (error) response.send(error);
        response.json({degreecode: degreecode});
    })
})
.put(function (request, response) {
    DegreecodeModel.findById(request.params.degreecode_id, function (error, degreecode) {
        if (error) {
            response.send({error: error});
        }
        else {
            degreecode.name = request.body.degreecode.name;
            degreecode.programrecords = request.body.degreecode.programrecords;

            degreecode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({degreecode: degreecode});
                }
            });
        }
    })
})
.delete(function (request, response) {
    DegreecodeModel.findByIdAndRemove(request.params.degreecode_id,
        function (error, deleted) {
            if (!error) {
                response.json({degreecode: deleted});
            };
        }
        );
});

app.route('/termcodes')
.post(function (request, response) {
    var termcode = new TermcodeModel(request.body.termcode);
    termcode.save(function (error) {
        if (error) response.send(error);
        response.json({termcode: termcode});
    });
})
.get(function (request, response) {
    var Programrecord = request.query.filter;
    if (!Programrecord) {
        TermcodeModel.find(function (error, termcodes) {
            if (error) response.send(error);
            response.json({termcode: termcodes});
        });
    } else {
        PermissionTypeModel.find({"programrecord": Programrecord.programrecord}, function (error, programrecords) {
            if (error) response.send(error);
            response.json({termcode: programrecords});
        });
    }
});

app.route('/termcodes/:termcode_id')
.get(function (request, response) {
    TermcodeModel.findById(request.params.termcode_id, function (error, termcode) {
        if (error) response.send(error);
        response.json({termcode: termcode});
    })
})
.put(function (request, response) {
    TermcodeModel.findById(request.params.termcode_id, function (error, termcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            termcode.name = request.body.termcode.name;
            termcode.programrecords = request.body.termcode.programrecords;

            termcode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({termcode: termcode});
                }
            });
        }
    })
})
.delete(function (request, response) {
    TermcodeModel.findByIdAndRemove(request.params.termcode_id,
        function (error, deleted) {
            if (!error) {
                response.json({termcode: deleted});
            };
        }
        );
});

app.route('/distributionresults')
.post(function (request, response) {
    var distributionresult = new DistributionresultModel(request.body.distributionresult);
    distributionresult.save(function (error) {
        if (error) response.send(error);
        response.json({distributionresult: distributionresult});
    });
})
.get(function (request, response) {
    var Distributionresult = request.query.distributionresult;
    if (!Distributionresult) {
        DistributionresultModel.find(function (error, distributionresults) {
            if (error) response.send(error);
            response.json({distributionresult: distributionresults});
        });
    }
});

app.route('/distributionresults/:distributionresult_id')
.get(function (request, response) {
    DistributionresultModel.findById(request.params.distributionresult_id, function (error, distributionresult) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({distributionresult: distributionresult});
        }
    });
})
.put(function (request, response) {
    DistributionresultModel.findById(request.params.distributionresult_id, function (error, distributionresult) {
        if (error) {
            response.send({error: error});
        }
        else {
            distributionresult.date = request.body.distributionresult.date;
            distributionresult.student = request.body.distributionresult.student;

            distributionresult.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({distributionresult: distributionresult});
                }
            });
        }
    });
})
.delete(function (request, response) {
    DistributionresultModel.findByIdAndRemove(request.params.distributionresult_id,
        function (error, deleted) {
            if (!error) {
                response.json({distributionresult: deleted});
            };
        }
        );
});

app.route('/commentcodes')
.post(function (request, response) {
    var commentcode = new CommentcodeModel(request.body.commentcode);
    commentcode.save(function (error) {
        if (error) response.send(error);
        response.json({commentcode: commentcode});
    });
})
.get(function (request, response) {
    var Commentcode = request.query.commentcode;
    if (!Commentcode) {
        CommentcodeModel.find(function (error, commentcodes) {
            if (error) response.send(error);
            response.json({commentcode: commentcodes});
        });
    }
});

app.route('/commentcodes/:commentcode_id')
.get(function (request, response) {
    CommentcodeModel.findById(request.params.commentcode_id, function (error, commentcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({commentcode: commentcode});
        }
    });
})
.put(function (request, response) {
    CommentcodeModel.findById(request.params.commentcode_id, function (error, commentcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            commentcode.date = request.body.commentcode.date;
            commentcode.distributionresult = request.body.commentcode.distributionresult;

            commentcode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({commentcode: commentcode});
                }
            });
        }
    });
})
.delete(function (request, response) {
    CommentcodeModel.findByIdAndRemove(request.params.commentcode_id,
        function (error, deleted) {
            if (!error) {
                response.json({commentcode: deleted});
            };
        }
        );
});

app.route('/residencies')
.post(function (request, response) {
    var residency = new ResidencyModel(request.body.residency);
    residency.save(function (error) {
        if (error) response.send(error);
        response.json({residency: residency});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        ResidencyModel.find(function (error, residencies) {
            if (error) response.send(error);
            response.json({residency: residencies});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({residency: students});
        });
    }
});

app.route('/residencies/:residency_id')
.get(function (request, response) {
    ResidencyModel.findById(request.params.residency_id, function (error, residency) {
        if (error) response.send(error);
        response.json({residency: residency});
    })
})
.put(function (request, response) {
    ResidencyModel.findById(request.params.residency_id, function (error, residency) {
        if (error) {
            response.send({error: error});
        }
        else {
            residency.name = request.body.residency.name;
            residency.students = request.body.residency.students;

            residency.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({residency: residency});
                }
            });
        }
    })
})
.delete(function (request, response) {
    ResidencyModel.findByIdAndRemove(request.params.residency_id,
        function (error, deleted) {
            if (!error) {
                response.json({residency: deleted});
            };
        }
        );
});

app.route('/genders')
.post(function (request, response) {
    var gender = new GenderModel(request.body.gender);
    gender.save(function (error) {
        if (error) response.send(error);
        response.json({gender: gender});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        GenderModel.find(function (error, genders) {
            if (error) response.send(error);
            response.json({gender: genders});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({gender: students});
        });
    }
});

app.route('/genders/:gender_id')
.get(function (request, response) {
    GenderModel.findById(request.params.gender_id, function (error, gender) {
        if (error) response.send(error);
        response.json({gender: gender});
    })
})
.put(function (request, response) {
    GenderModel.findById(request.params.gender_id, function (error, gender) {
        if (error) {
            response.send({error: error});
        }
        else {
            gender.name = request.body.gender.name;
            gender.students = request.body.gender.students;

            gender.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({gender: gender});
                }
            });
        }
    })
})
.delete(function (request, response) {
    GenderModel.findByIdAndRemove(request.params.gender_id,
        function (error, deleted) {
            if (!error) {
                response.json({gender: deleted});
            };
        }
        );
});

app.route('/countries')
.post(function (request, response) {
    var country = new CountryModel(request.body.country);
    country.save(function (error) {
        if (error) response.send(error);
        response.json({country: country});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        CountryModel.find(function (error, countries) {
            if (error) response.send(error);
            response.json({country: countries});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({country: students});
        });
    }

// //added
// var Province = request.query.filter;
// if (!Province) {
//     CountryModel.find(function (error, countries) {
//         if (error) response.send(error);
//         response.json({country: countries});
//     });
// } else {
//     PermissionTypeModel.find({"province": Province.province}, function (error, provinces) {
//         if (error) response.send(error);
//         response.json({country: provinces});
//     });
// }
// //end added
});

app.route('/countries/:country_id')
.get(function (request, response) {
    CountryModel.findById(request.params.country_id, function (error, country) {
        if (error) response.send(error);
        response.json({country: country});
    })
})
.put(function (request, response) {
    CountryModel.findById(request.params.country_id, function (error, country) {
        if (error) {
            response.send({error: error});
        }
        else {
            country.name = request.body.country.name;
            country.students = request.body.country.students;
            country.provinces = request.body.country.provinces;

            country.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({country: country});
                }
            });
        }
    })
})
.delete(function (request, response) {
    CountryModel.findByIdAndRemove(request.params.country_id,
        function (error, deleted) {
            if (!error) {
                response.json({country: deleted});
            };
        }
        );
});

app.route('/provinces')
.post(function (request, response) {
    var province = new ProvinceModel(request.body.province);
    province.save(function (error) {
        if (error) response.send(error);
        response.json({province: province});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        ProvinceModel.find(function (error, provinces) {
            if (error) response.send(error);
            response.json({province: provinces});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({province: students});
        });
    }

// //added
// var Province = request.query.province;
// if (!Province) {
//     ProvinceModel.find(function (error, provinces) {
//         if (error) response.send(error);
//         response.json({province: provinces});
//     });
// } else {
//     if(Province == "country"){
//         ProvinceModel.find({"country": request.query.country}, function (error, provinces) {
//             if (error) response.send(error);
//             response.json({province: provinces});
//         });
//     }
// }
// //end added
});

app.route('/provinces/:province_id')
.get(function (request, response) {
    ProvinceModel.findById(request.params.province_id, function (error, province) {
        if (error) response.send(error);
        response.json({province: province});
    })
})
.put(function (request, response) {
    ProvinceModel.findById(request.params.province_id, function (error, province) {
        if (error) {
            response.send({error: error});
        }
        else {
            province.name = request.body.province.name;
            province.students = request.body.province.students;
            province.country = request.body.province.country;
            province.cities = request.body.province.cities;

            province.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({province: province});
                }
            });
        }
    })
})
.delete(function (request, response) {
    ProvinceModel.findByIdAndRemove(request.params.province_id,
        function (error, deleted) {
            if (!error) {
                response.json({province: deleted});
            };
        }
        );
});

app.route('/cities')
.post(function (request, response) {
    var city = new CityModel(request.body.city);
    city.save(function (error) {
        if (error) response.send(error);
        response.json({city: city});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        CityModel.find(function (error, cities) {
            if (error) response.send(error);
            response.json({city: cities});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({city: students});
        });
    }
});

app.route('/cities/:city_id')
.get(function (request, response) {
    CityModel.findById(request.params.city_id, function (error, city) {
        if (error) response.send(error);
        response.json({city: city});
    })
})
.put(function (request, response) {
    CityModel.findById(request.params.city_id, function (error, city) {
        if (error) {
            response.send({error: error});
        }
        else {
            city.name = request.body.city.name;
            city.students = request.body.city.students;
            city.province = request.body.city.province;
            city.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({city: city});
                }
            });
        }
    })
})
.delete(function (request, response) {
    CityModel.findByIdAndRemove(request.params.city_id,
        function (error, deleted) {
            if (!error) {
                response.json({city: deleted});
            };
        }
        );
});

app.route('/academicloads')
.post(function (request, response) {
    var academicload = new AcademicloadModel(request.body.academicload);
    academicload.save(function (error) {
        if (error) response.send(error);
        response.json({academicload: academicload});
    });
})
.get(function (request, response) {
    var Student = request.query.filter;
    if (!Student) {
        AcademicloadModel.find(function (error, academicloads) {
            if (error) response.send(error);
            response.json({academicload: academicloads});
        });
    } else {
        PermissionTypeModel.find({"student": Student.student}, function (error, students) {
            if (error) response.send(error);
            response.json({academicload: students});
        });
    }
});

app.route('/academicloads/:academicload_id')
.get(function (request, response) {
    AcademicloadModel.findById(request.params.academicload_id, function (error, academicload) {
        if (error) response.send(error);
        response.json({academicload: academicload});
    })
})
.put(function (request, response) {
    AcademicloadModel.findById(request.params.academicload_id, function (error, academicload) {
        if (error) {
            response.send({error: error});
        }
        else {
            academicload.name = request.body.academicload.name;
            academicload.students = request.body.academicload.students;

            academicload.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({academicload: academicload});
                }
            });
        }
    })
})
.delete(function (request, response) {
    AcademicloadModel.findByIdAndRemove(request.params.academicload_id,
        function (error, deleted) {
            if (!error) {
                response.json({academicload: deleted});
            };
        }
        );
});

app.route('/itrprograms')
.post(function (request, response) {
    var itrprogram = new ItrprogramModel(request.body.itrprogram);
    itrprogram.save(function (error) {
        if (error) response.send(error);
        response.json({itrprogram: itrprogram});
    });
})
.get(function (request, response) {
    var itrprogram = request.query.itrprogram;
    if (!itrprogram) {
        ItrprogramModel.find(function (error, itrprograms) {
            if (error) response.send(error);
            response.json({itrprogram: itrprograms});
        });
    } 
});

app.route('/itrlists/:itrlist_id')
.get(function (request, response) {
    ItrlistModel.findById(request.params.itrlist_id, function (error, itrlist) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({itrlist: itrlist});
        }
    });
})
.put(function (request, response) {
    ItrlistModel.findById(request.params.itrlist_id, function (error, itrlist) {
        if (error) {
            response.send({error: error});
        }
        else {
            itrlist.order = request.body.itrlist.order;
            itrlist.eligibility = request.body.itrlist.eligibility;
            itrlist.student = request.body.itrlist.student;
            itrlist.academicprogramcode = request.body.itrlist.academicprogramcode;
            itrlist.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({itrlist: itrlist});
                }
            });
        }
    });
})

app.route('/academicprogramcodes')
.post(function (request, response) {
    var academicprogramcode = new AcademicprogramcodeModel(request.body.academicprogramcode);
    academicprogramcode.save(function (error) {
        if (error) response.send(error);
        response.json({academicprogramcode: academicprogramcode});
    });
})
.get(function (request, response) {
    var academicprogramcode = request.query.academicprogramcode;
    if (!academicprogramcode) {
        AcademicprogramcodeModel.find(function (error, academicprogramcodes) {
            if (error) response.send(error);
            response.json({academicprogramcode: academicprogramcodes});
        });
    } 
});

app.route('/programadministrations')
.post(function (request, response) {
    var programadministration = new ProgramadministrationModel(request.body.programadministration);
    programadministration.save(function (error) {
        if (error) response.send(error);
        response.json({programadministration: programadministration});
    });
})
.get(function (request, response) {
    var programadministration = request.query.programadministration;
    var department = request.query.department;
    if(department){
        ProgramadministrationModel.find({"department":department}, function (error, programadministrations) {
            if (error) response.send(error);
            response.json({programadministration: programadministrations});
        });
    }
    else {
        ProgramadministrationmentModel.find(function (error, programadministrations) {
            if (error) response.send(error);
            response.json({programadministration: programadministrations});
        });
    } 
});

app.route('/programadministrations/:programadministration_id')
.get(function (request, response) {
    ProgramadministrationModel.findById(request.params.programadministration_id, function (error, programadministration) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programadministration: programadministration});
        }
    });
})
.put(function (request, response) {
    ProgramadministrationModel.findById(request.params.programadministration_id, function (error, programadministration) {
        if (error) {
            response.send({error: error});
        }
        else {
            programadministration.name = request.body.programadministration.name;

            programadministration.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({programadministration: programadministration});
                }
            });
        }
    });
})
.delete(function (request, response) {
    ProgramadministrationModel.findByIdAndRemove(request.params.programadministration_id,
        function (error, deleted) {
            if (!error) {
                response.json({programadministration: deleted});
            };
        }
        );
});

app.route('/departments')
.post(function (request, response) {
    var department = new DepartmentModel(request.body.department);
    department.save(function (error) {
        if (error) response.send(error);
        response.json({department: department});
    });
})
.get(function (request, response) {
    var department = request.query.department;
    var faculty = request.query.faculty;
    if(faculty){
        DepartmentModel.find({"faculty":faculty}, function (error, departments) {
            if (error) response.send(error);
            response.json({department: departments});
        });
    }
    else {
        DepartmentModel.find(function (error, departments) {
            if (error) response.send(error);
            response.json({department: departments});
        });
    } 
});

app.route('/departments/:department_id')
.get(function (request, response) {
    DepartmentModel.findById(request.params.department_id, function (error, department) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({department: department});
        }
    });
})
.put(function (request, response) {
    DepartmentModel.findById(request.params.department_id, function (error, department) {
        if (error) {
            response.send({error: error});
        }
        else {
            department.name = request.body.department.name;

            department.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({department: department});
                }
            });
        }
    });
})
.delete(function (request, response) {
    DepartmentModel.findByIdAndRemove(request.params.department_id,
        function (error, deleted) {
            if (!error) {
                response.json({department: deleted});
            };
        }
        );
});

app.route('/faculties')
.post(function (request, response) {
    var faculty = new FacultyModel(request.body.faculty);
    faculty.save(function (error) {
        if (error) response.send(error);
        response.json({faculty: faculty});
    });
})
.get(function (request, response) {
    var faculty = request.query.faculty;
    if (!faculty) {
        FacultyModel.find(function (error, faculties) {
            if (error) response.send(error);
            response.json({faculty: faculties});
        });
    } 
});

app.route('/faculties/:faculty_id')
.get(function (request, response) {
    FacultyModel.findById(request.params.faculty_id, function (error, faculty) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({faculty: faculty});
        }
    });
})
.put(function (request, response) {
    FacultyModel.findById(request.params.faculty_id, function (error, faculty) {
        if (error) {
            response.send({error: error});
        }
        else {
            faculty.name = request.body.faculty.name;
            //faculty.department = request.body.faculty.department;

            faculty.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({faculty: faculty});
                }
            });
        }
    });
})
.delete(function (request, response) {
    FacultyModel.findByIdAndRemove(request.params.faculty_id,
        function (error, deleted) {
            if (!error) {
                response.json({faculty: deleted});
            };
        }
        );
});

app.route('/admissionrules')
.post(function (request, response) {
    var admissionrule = new AdmissionruleModel(request.body.admissionrule);
    admissionrule.save(function (error) {
        if (error) response.send(error);
        response.json({admissionrule: admissionrule});
    });
})
.get(function (request, response) {
    var admissionrule = request.query.admissionrule;
    if (!admissionrule) {
        AdmissionruleModel.find(function (error, admissionrules) {
            if (error) response.send(error);
            response.json({admissionrule: admissionrules});
        });
    } 
});

app.route('/admissionrules/:admissionrule_id')
.get(function (request, response) {
    AdmissionruleModel.findById(request.params.admissionrule_id, function (error, admissionrule) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({admissionrule: admissionrule});
        }
    });
})
.put(function (request, response) {
    AdmissionruleModel.findById(request.params.admissionrule_id, function (error, admissionrule) {
        if (error) {
            response.send({error: error});
        }
        else {
            admissionrule.description = request.body.admissionrule.description;

            admissionrule.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({admissionrule: admissionrule});
                }
            });
        }
    });
})
.delete(function (request, response) {
    AdmissionruleModel.findByIdAndRemove(request.params.admissionrule_id,
        function (error, deleted) {
            if (!error) {
                response.json({admissionrule: deleted});
            };
        }
        );
});

app.route('/logicalexpressions')
.post(function (request, response) {
    var logicalexpression = new LogicalexpressionModel(request.body.logicalexpression);
    logicalexpression.save(function (error) {
        if (error) response.send(error);
        response.json({logicalexpression: logicalexpression});
    });
})
.get(function (request, response) {
    var logicalexpression = request.query.logicalexpression;
    var admissionrule = request.query.admissionrule;
    if(admissionrule){
        LogicalexpressionModel.find({"admissionrule":admissionrule}, function (error, logicalexpressions) {
            if (error) response.send(error);
            response.json({logicalexpression: logicalexpressions});
        });
    }
    else {
        LogicalexpressionModel.find(function (error, logicalexpressions) {
            if (error) response.send(error);
            response.json({logicalexpression: logicalexpressions});
        });
    } 
});

app.route('/logicalexpressions/:logicalexpression_id')
.get(function (request, response) {
    LogicalexpressionModel.findById(request.params.logicalexpression_id, function (error, logicalexpression) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({logicalexpression: logicalexpression});
        }
    });
})
.put(function (request, response) {
    LogicalexpressionModel.findById(request.params.logicalexpression_id, function (error, logicalexpression) {
        if (error) {
            response.send({error: error});
        }
        else {
            logicalexpression.booleanExp = request.body.logicalexpression.booleanExp;

            logicalexpression.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({logicalexpression: logicalexpression});
                }
            });
        }
    });
})
.delete(function (request, response) {
    LogicalexpressionModel.findByIdAndRemove(request.params.logicalexpression_id,
        function (error, deleted) {
            if (!error) {
                response.json({logicalexpression: deleted});
            };
        }
        );
});


// ADDED MM
app.route('/secondaryschools')
.post(function (request, response) {
    var secondaryschool = new SecondaryschoolModel(request.body.secondaryschool);
    secondaryschool.save(function (error) {
        if (error) response.send(error);
        response.json({secondaryschool: secondaryschool});
    });
})
.get(function (request, response) {
    var Secondaryschool = request.query.secondaryschool;
    var student = request.query.student;
    if (student) {
        SecondaryschoolModel.find({"student": student}, function (error, secondaryschools) {
            if (error) response.send(error);
            response.json({secondaryschool: secondaryschools});
        });
    }
    else {
        SecondaryschoolModel.find(function (error, secondaryschools) {
            if (error) response.send(error);
            response.json({secondaryschool: secondaryschools});
        });
    }
});

app.route('/secondaryschools/:secondaryschool_id')
.get(function (request, response) {
    SecondaryschoolModel.findById(request.params.secondaryschool_id, function (error, secondaryschool) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({secondaryschool: secondaryschool});
        }
    });
})
.put(function (request, response) {
    SecondaryschoolModel.findById(request.params.secondaryschool_id, function (error, secondaryschool) {
        if (error) {
            response.send({error: error});
        }
        else {
            secondaryschool.name = request.body.secondaryschool.name;
            secondaryschool.student = request.body.secondaryschool.student;

            secondaryschool.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({secondaryschool: secondaryschool});
                }
            });
        }
    });
})
.delete(function (request, response) {
    SecondaryschoolModel.findByIdAndRemove(request.params.secondaryschool_id,
        function (error, deleted) {
            if (!error) {
                response.json({secondaryschool: deleted});
            };
        }
        );
});
// END ADDED MM


// ADDED MM
app.route('/highschoolcoursesmarks')
.post(function (request, response) {
    var highschoolcoursesmark = new HighschoolcoursesmarkModel(request.body.highschoolcoursesmark);
    highschoolcoursesmark.save(function (error) {
        if (error) response.send(error);
        response.json({highschoolcoursesmark: highschoolcoursesmark});
    });
})
.get(function (request, response) {
    var highschoolcoursesmark = request.query.highschoolcoursesmark;
    var secondaryschool = request.query.secondaryschool;
    var highschoolsubject = request.query.highschoolsubject;
    if (secondaryschool) {
        HighschoolcoursesmarkModel.find({"secondaryschool": secondaryschool}, function (error, highschoolcoursesmarks) {
            if (error) response.send(error);
            response.json({highschoolcoursesmark: highschoolcoursesmarks});
        });
    }
    else if(highschoolsubject){
        HighschoolcoursesmarkModel.find({"highschoolsubject":highschoolsubject}, function (error, highschoolcoursesmarks) {
            if (error) response.send(error);
            response.json({highschoolcoursesmark: highschoolcoursesmarks});
        });
    }
    else {
        HighschoolcoursesmarkModel.find(function (error, highschoolcoursesmarks) {
            if (error) response.send(error);
            response.json({highschoolcoursesmark: highschoolcoursesmarks});
        });
    } 
});

app.route('/highschoolcoursesmarks/:highschoolcoursesmark_id')
.get(function (request, response) {
    HighschoolcoursesmarkModel.findById(request.params.highschoolcoursesmark_id, function (error, highschoolcoursesmark) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({highschoolcoursesmark: highschoolcoursesmark});
        }
    });
})
.put(function (request, response) {
    HighschoolcoursesmarkModel.findById(request.params.highschoolcoursesmark_id, function (error, highschoolcoursesmark) {
        if (error) {
            response.send({error: error});
        }
        else {
            highschoolcoursesmark.level = request.body.highschoolcoursesmark.level;
            highschoolcoursesmark.source = request.body.highschoolcoursesmark.source;
            highschoolcoursesmark.unit = request.body.highschoolcoursesmark.unit;
            highschoolcoursesmark.grade = request.body.highschoolcoursesmark.grade;
            highschoolcoursesmark.secondaryschool = request.body.highschoolcoursesmark.secondaryschool;

            highschoolcoursesmark.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({highschoolcoursesmark: highschoolcoursesmark});
                }
            });
        }
    });
})
.delete(function (request, response) {
    HighschoolcoursesmarkModel.findByIdAndRemove(request.params.highschoolcoursesmark_id,
        function (error, deleted) {
            if (!error) {
                response.json({highschoolcoursesmark: deleted});
            };
        }
        );
});
// END ADDED


// ADDED MM
app.route('/highschoolsubjects')
.post(function (request, response) {
    var highschoolsubject = new HighschoolsubjectModel(request.body.highschoolsubject);
    highschoolsubject.save(function (error) {
        if (error) response.send(error);
        response.json({highschoolsubject: highschoolsubject});
    });
})
.get(function (request, response) {
    var highschoolsubject = request.query.highschoolsubject;
    if (!highschoolsubject) {
        HighschoolsubjectModel.find(function (error, highschoolsubjects) {
            if (error) response.send(error);
            response.json({highschoolsubject: highschoolsubjects});
        });
    } 
});

app.route('/highschoolsubjects/:highschoolsubject_id')
.get(function (request, response) {
    HighschoolsubjectModel.findById(request.params.highschoolsubject_id, function (error, highschoolsubject) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({highschoolsubject: highschoolsubject});
        }
    });
})
.put(function (request, response) {
    HighschoolsubjectModel.findById(request.params.highschoolsubject_id, function (error, highschoolsubject) {
        if (error) {
            response.send({error: error});
        }
        else {
            highschoolsubject.name = request.body.highschoolsubject.name;
            highschoolsubject.description = request.body.highschoolsubject.description;

            highschoolsubject.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({highschoolsubject: highschoolsubject});
                }
            });
        }
    });
})
.delete(function (request, response) {
    HighschoolsubjectModel.findByIdAndRemove(request.params.highschoolsubject_id,
        function (error, deleted) {
            if (!error) {
                response.json({highschoolsubject: deleted});
            };
        }
        );
});
// END ADDED

// ADDED MM
app.route('/scholarandawardcodes')
.post(function (request, response) {
    var scholarandawardcode = new ScholarandawardcodeModel(request.body.scholarandawardcode);
    scholarandawardcode.save(function (error) {
        if (error) response.send(error);
        response.json({scholarandawardcode: scholarandawardcode});
    });
})
.get(function (request, response) {
    var Scholarandawardcode = request.query.scholarandawardcode;
    var student = request.query.student;
    if (student) {
        ScholarandawardcodeModel.find({"student": student}, function (error, scholarandawardcodes) {
            if (error) response.send(error);
            response.json({scholarandawardcode: scholarandawardcodes});
        });
    }
    else {
        ScholarandawardcodeModel.find(function (error, scholarandawardcodes) {
            if (error) response.send(error);
            response.json({scholarandawardcode: scholarandawardcodes});
        });
    }
});

app.route('/scholarandawardcodes/:scholarandawardcode_id')
.get(function (request, response) {
    ScholarandawardcodeModel.findById(request.params.scholarandawardcode_id, function (error, scholarandawardcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({scholarandawardcode: scholarandawardcode});
        }
    });
})
.put(function (request, response) {
    ScholarandawardcodeModel.findById(request.params.scholarandawardcode_id, function (error, scholarandawardcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            scholarandawardcode.name = request.body.scholarandawardcode.name;
            scholarandawardcode.student = request.body.scholarandawardcode.student;

            scholarandawardcode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({scholarandawardcode: scholarandawardcode});
                }
            });
        }
    });
})
.delete(function (request, response) {
    ScholarandawardcodeModel.findByIdAndRemove(request.params.scholarandawardcode_id,
        function (error, deleted) {
            if (!error) {
                response.json({scholarandawardcode: deleted});
            };
        }
        );
});
// END ADDED MM

// ADDED MM --> SYD'S SERVER FILE
app.route('/highschooladmissionaverages')
.post(function (request, response) {
    var highschooladmissionaverage = new HighschooladmissionaverageModel(request.body.highschooladmissionaverage);
    highschooladmissionaverage.save(function (error) {
        if (error) response.send(error);
        response.json({highschooladmissionaverage: highschooladmissionaverage});
    });
})
.get(function (request, response) {
    var Highschooladmissionaverage = request.query.highschooladmissionaverage;
    var student = request.query.student;
    console.log(student);
    if (student) {
        HighschooladmissionaverageModel.find({"student": student}, function (error, highschooladmissionaverages) {
            if (error) response.send(error);
            response.json({highschooladmissionaverage: highschooladmissionaverages});
        });
    }
    else {
        HighschooladmissionaverageModel.find(function (error, highschooladmissionaverages) {
            if (error) response.send(error);
            response.json({highschooladmissionaverage: highschooladmissionaverages});
        });
    }
});
//         StudentsModel.find({"highschooladmissionaverage": request.query.highschooladmissionaverage}, function (error, students) {
    app.route('/highschooladmissionaverages/:highschooladmissionaverage_id')
    .get(function (request, response) {
        HighschooladmissionaverageModel.findById(request.params.highschooladmissionaverage_id, function (error, highschooladmissionaverage) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({highschooladmissionaverage: highschooladmissionaverage});
            }
        });
    })
    .put(function (request, response) {
        HighschooladmissionaverageModel.findById(request.params.highschooladmissionaverage_id, function (error, highschooladmissionaverage) {
            if (error) {
                response.send({error: error});
            }
            else {
                highschooladmissionaverage.first = request.body.highschooladmissionaverage.first;
                highschooladmissionaverage.midYear = request.body.highschooladmissionaverage.midYear;
                highschooladmissionaverage._final = request.body.highschooladmissionaverage._final;
                highschooladmissionaverage.grade11 = request.body.highschooladmissionaverage.grade11;
                highschooladmissionaverage.student = request.body.highschooladmissionaverage.student;
                highschooladmissionaverage.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({highschooladmissionaverage: highschooladmissionaverage});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        HighschooladmissionaverageModel.findByIdAndRemove(request.params.highschooladmissionaverage_id,
            function (error, deleted) {
                if (!error) {
                    response.json({highschooladmissionaverage: deleted});
                };
            }
            );
    });
//end added - highschooladmissionaverage
//added - basisofadmission
app.route('/basisofadmissions')
.post(function (request, response) {
    var basisofadmission = new BasisofadmissionModel(request.body.basisofadmission);
    basisofadmission.save(function (error) {
        if (error) response.send(error);
        response.json({basisofadmission: basisofadmission});
    });
})
.get(function (request, response) {
    var Basisofadmission = request.query.basisofadmission;
    var date = request.query.date;
    var comment = request.query.comment;
    var basisCode = request.query.basisCode;
    var student = request.query.student;
    if (student) {
        BasisofadmissionModel.find({"student": student}, function (error, basisofadmissions) {
            if (error) response.send(error);
            response.json({basisofadmission: basisofadmissions});
        });
    }
    else if (date) {
        BasisofadmissionModel.find({"date": date}, function (error, basisofadmissions) {
            if (error) response.send(error);
            response.json({basisofadmission: basisofadmissions});
        });
    }
    else if (comment) {
        BasisofadmissionModel.find({"comment": comment}, function (error, basisofadmissions) {
            if (error) response.send(error);
            response.json({basisofadmission: basisofadmissions});
        });
    }
    else if (basisCode) {
        BasisofadmissionModel.find({"basisCode": basisCode}, function (error, basisofadmissions) {
            if (error) response.send(error);
            response.json({basisofadmission: basisofadmissions});
        });
    }
    else {
        BasisofadmissionModel.find(function (error, basisofadmissions) {
            if (error) response.send(error);
            response.json({basisofadmission: basisofadmissions});
        });
    }
});
//         StudentsModel.find({"basisofadmission": request.query.basisofadmission}, function (error, students) {
    app.route('/basisofadmissions/:basisofadmission_id')
    .get(function (request, response) {
        BasisofadmissionModel.findById(request.params.basisofadmission_id, function (error, basisofadmission) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({basisofadmission: basisofadmission});
            }
        });
    })
    .put(function (request, response) {
        BasisofadmissionModel.findById(request.params.basisofadmission_id, function (error, basisofadmission) {
            if (error) {
                response.send({error: error});
            }
            else {
                basisofadmission.date = request.body.basisofadmission.date;
                basisofadmission.comment = request.body.basisofadmission.comment;
                basisofadmission.basisCode = request.body.basisofadmission.basisCode;
                basisofadmission.student = request.body.basisofadmission.student;
                basisofadmission.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({basisofadmission: basisofadmission});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        BasisofadmissionModel.findByIdAndRemove(request.params.basisofadmission_id,
            function (error, deleted) {
                if (!error) {
                    response.json({basisofadmission: deleted});
                };
            }
            );
    });
//end added - basisofadmission
//added - basisofadmissioncode
app.route('/basisofadmissioncodes')
.post(function (request, response) {
    var basisofadmissioncode = new BasisofadmissioncodeModel(request.body.basisofadmissioncode);
    basisofadmissioncode.save(function (error) {
        if (error) response.send(error);
        response.json({basisofadmissioncode: basisofadmissioncode});
    });
})
.get(function (request, response) {
    var Basisofadmissioncode = request.query.basisofadmissioncode;
    var name = request.query.name;
    var basisofadmission = request.query.basisofadmission;
    if (name) {
        BasisofadmissioncodeModel.find({"name": name}, function (error, basisofadmissioncodes) {
            if (error) response.send(error);
            response.json({basisofadmissioncode: basisofadmissioncodes});
        });
    }
    else if (basisofadmission) {
        BasisofadmissioncodeModel.find({"basisofadmission": basisofadmission}, function (error, basisofadmissioncodes) {
            if (error) response.send(error);
            response.json({basisofadmissioncode: basisofadmissioncodes});
        });
    }
    else {
        BasisofadmissioncodeModel.find(function (error, basisofadmissioncodes) {
            if (error) response.send(error);
            response.json({basisofadmissioncode: basisofadmissioncodes});
        });
    }
});
//         StudentsModel.find({"basisofadmissioncode": request.query.basisofadmissioncode}, function (error, students) {
    app.route('/basisofadmissioncodes/:basisofadmissioncode_id')
    .get(function (request, response) {
        BasisofadmissioncodeModel.findById(request.params.basisofadmissioncode_id, function (error, basisofadmissioncode) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({basisofadmissioncode: basisofadmissioncode});
            }
        });
    })
    .put(function (request, response) {
        BasisofadmissioncodeModel.findById(request.params.basisofadmissioncode_id, function (error, basisofadmissioncode) {
            if (error) {
                response.send({error: error});
            }
            else {
                basisofadmissioncode.name = request.body.basisofadmissioncode.name;
                basisofadmissioncode.basisofadmission = request.body.basisofadmissioncode.basisofadmission;
                basisofadmissioncode.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({basisofadmissioncode: basisofadmissioncode});
                    }
                });
            }
        });
    })
    .delete(function (request, response) {
        BasisofadmissioncodeModel.findByIdAndRemove(request.params.basisofadmissioncode_id,
            function (error, deleted) {
                if (!error) {
                    response.json({basisofadmissioncode: deleted});
                };
            }
            );
    });
//end added - basisofadmissioncode
// END ADDED MM --> SYD'S SERVER FILE


app.listen(7700, function () {
    console.log('Listening on port 7700');
});

