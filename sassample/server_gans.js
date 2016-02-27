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
    province: {type: mongoose.Schema.ObjectId, ref: 'provinceModel'},
    city: {type: mongoose.Schema.ObjectId, ref: 'cityModel'},
    academicload: {type: mongoose.Schema.ObjectId, ref: 'academicloadModel'}
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
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
}
);
var provinceSchema = mongoose.Schema(
{
    name: String,
    students: [{type: mongoose.Schema.ObjectId, ref: ('StudentsModel')}]
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

var StudentsModel = mongoose.model('student', studentsSchema);
var ResidencyModel = mongoose.model('residency', residencySchema);
var GenderModel = mongoose.model('gender', genderSchema);
var CountryModel = mongoose.model('country', countrySchema);
var ProvinceModel = mongoose.model('province', provinceSchema);
var CityModel = mongoose.model('city', citySchema);
var AcademicloadModel = mongoose.model('academicload', academicloadSchema);

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
    } else {
            StudentsModel.find({"residency": request.query.residency}, function (error, students) {
                if (error) response.send(error);
                response.json({student: students});
            });

            StudentsModel.find({"gender": request.query.gender}, function (error, students) {
                if (error) response.send(error);
                response.json({student: students});
            });

            StudentsModel.find({"country": request.query.country}, function (error, students) {
                if (error) response.send(error);
                response.json({student: students});
            });

            StudentsModel.find({"province": request.query.province}, function (error, students) {
                if (error) response.send(error);
                response.json({student: students});
            });
            StudentsModel.find({"city": request.query.city}, function (error, students) {
                if (error) response.send(error);
                response.json({student: students});
            });

            StudentsModel.find({"academicload": request.query.academicload}, function (error, students) {
                if (error) response.send(error);
                response.json({student: students});
            });
    }
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
    ResidencyModel.findById(request.params.rolePermission_id, function (error, residency) {
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

