var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./logger');

mongoose.connect('mongodb://localhost/sasdb');

var app = express();

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(logger);

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
    grades: [{type: mongoose.Schema.ObjectId, ref: ('GradeModel')}]
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
    //     if (Student == "residency"){
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

//added - GRADES
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
    if (!Grade) {
        GradeModel.find(function (error, grades) {
            if (error) response.send(error);
            response.json({grade: grades});
        });
    }
});

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
//end added - GRADES

//added - COURSECODES
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
});
//end added - COURSECODES

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
    GenderModel.findById(request.params.rolePermission_id, function (error, gender) {
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
    CountryModel.findById(request.params.rolePermission_id, function (error, country) {
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
    ProvinceModel.findById(request.params.rolePermission_id, function (error, province) {
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
    CityModel.findById(request.params.rolePermission_id, function (error, city) {
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
    AcademicloadModel.findById(request.params.rolePermission_id, function (error, academicload) {
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
});

app.listen(7700, function () {
    console.log('Listening on port 7700');
});

