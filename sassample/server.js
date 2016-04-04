var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./logger');

/*ADDED*/
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
/*END ADDED*/

mongoose.connect('mongodb://localhost/sasdb');

var app = express();

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(logger);

/*ADDED*/
app.use('/users', users);
app.use('/roleCodes', roleCodes);
app.use('/userRoles', userRoles);
app.use('/rolePermissions', rolePermissions);
app.use('/passwords', passwords);
app.use('/logins', logins);
app.use('/roots', roots);
/*END ADDED*/



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static('public'));

var studentsSchema = mongoose.Schema(
{
    number: String,
    firstName: String,
    lastName: String,
    DOB: String,
    cumAvg: String,
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

var programplacementSchema = mongoose.Schema(
{
    academicprogramcode: {type:mongoose.Schema.ObjectId, ref: 'AcademicprogramcodeModel'},
    distributionresult: {type: mongoose.Schema.ObjectId, ref: 'DistributionresultModel'},
    commentcode: {type: mongoose.Schema.ObjectId, ref: 'CommentcodeModel'},
    student: {type: mongoose.Schema.ObjectId, ref: 'StudentsModel'},
    choice: String,
    override:String
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
var ProgramplacementModel = mongoose.model('programplacement',programplacementSchema);

// ADDED MM
var SecondaryschoolModel = mongoose.model('secondaryschool', secondaryschoolSchema);
var HighschoolcoursesmarkModel = mongoose.model('highschoolcoursesmark', highschoolcoursesmarksSchema);
var HighschoolsubjectModel = mongoose.model('highschoolsubject', highschoolsubjectSchema);
var ScholarandawardcodeModel = mongoose.model('scholarandawardcode', scholarandawardcodeSchema);
var HighschooladmissionaverageModel = mongoose.model('highschooladmissionaverage', highschooladmissionaverageSchema);
var BasisofadmissionModel = mongoose.model('basisofadmission', basisofadmissionSchema);
var BasisofadmissioncodeModel = mongoose.model('basisofadmissioncode',basisofadmissioncodeSchema);
// END ADDED MM

app.route('/programplacements')
.post(function (request, response) {
    var placed = new ProgramplacementModel(request.body.programplacement);
    placed.save(function (error) {
        if (error) response.send(error);
        response.json({programplacement: programplacements});
    });
})
.get(function (request, response) {
    var distributionresult = request.query.distributionresult;
    if (distributionresult){
        ProgramplacementModel.find({"distributionresult": distributionresult}, function (error, programplacements) {
        if (error) response.send(error);
        response.json({programplacement: programplacements});
    });
    }
    else{
        ProgramplacementModel.find(function (error, programplacements) {
            if (error) response.send(error);
            response.json({programplacement: programplacements});
        });
    }
});

app.route('/programplacements/:programplacement_id')
    .get(function (request, response) {
        ProgramplacementModel.findById(request.params.programplacement_id, function (error, programplacement) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({programplacement: programplacement});
            }
        });
    })
    .put(function (request, response) {
        ProgramplacementModel.findById(request.params.programplacement_id, function (error, programplacement) {
            if (error) {
                response.send({error: error});
            }
            else {
                programplacement.academicprogramcode = request.body.programplacement.academicprogramcode;
                programplacement.override="true";
                programplacement.choice="Modified";

                programplacement.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({programplacement: programplacement});
                    }
                });
            }
        });
    })


app.route('/students')
.post(function (request, response) {
    var student = new StudentsModel(request.body.student);
    student.save(function (error) {
        if (error) response.send(error);
        response.json({student: student});
    });
})
.get(function (request, response) {
    var number = request.query.number;
    var generate = request.query.generate;
    if (generate) 
    {
        var returnMessage="";
        var allStudents= [];
        var allItrprograms=[];
        var allAcademicprogramcodes=[];
        var allLogicalExpressions=[];
        var allGrades=[];
        var allCourses=[];
        var allProgramplacements=[];
        var Distributionresult;
        StudentsModel.find(function (error, students) {

            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            var newdate = day + "/" + month + "/" + year;
            Distributionresult= new DistributionresultModel({
                date:newdate
            });
            Distributionresult.save();
            for (var i = 0; i < students.length; i++)
            {
                allStudents.push(students[i]);
            }
            var cleanedStudents=new Array(allStudents.length);
            for(var i=0;i<allStudents.length;i++)
            {
              cleanedStudents[i]=new Array(4);
              cleanedStudents[i][0]=allStudents[i].id;
              cleanedStudents[i][1]=allStudents[i].number;
              cleanedStudents[i][2]=allStudents[i].cumAvg;
              cleanedStudents[i][3]=allStudents[i];
              if(cleanedStudents[i][2]=="")
              {
                cleanedStudents[i][2]=0;
              }
            }

            //insertion sort
            for(var i = 0; i < cleanedStudents.length; i++) 
            {
              var tmp = cleanedStudents[i];
              for(var j = i - 1; j >= 0 && (parseFloat(cleanedStudents[j][2]) < parseFloat(tmp[2])); j--) 
              {
                cleanedStudents[j+1] = cleanedStudents[j];
              }
              cleanedStudents[j+1] = tmp;
            }

            // //print
            // for(var i=0;i<cleanedStudents.length;i++)
            // {
            //     console.log(cleanedStudents[i]);
            // }

            ItrprogramModel.find(function (error, itrprograms) {
                for (var i = 0; i < itrprograms.length; i++)
                {
                    allItrprograms.push(itrprograms[i]);
                }

                //find all itrprograms
                var cleanedItr=new Array(allItrprograms.length);
                for(var i=0;i<allItrprograms.length;i++)
                {
                  cleanedItr[i]=new Array(6);
                  cleanedItr[i][0]=allItrprograms[i].student;
                  cleanedItr[i][1]=allItrprograms[i].order;
                  cleanedItr[i][2]=allItrprograms[i].academicprogramcode;
                }

                // //print
                // for(var i=0;i<cleanedItr.length;i++)
                // {
                //   console.log(cleanedItr[i]);
                // }
                AcademicprogramcodeModel.find(function (error, academicprogramcodes) 
                {
                    for (var i = 0; i < academicprogramcodes.length; i++)
                    {
                        allAcademicprogramcodes.push(academicprogramcodes[i]);
                    }
                    for(var i=0;i<cleanedItr.length;i++)
                    {
                        for(var j=0;j<allAcademicprogramcodes.length;j++)
                        {
                            if(allAcademicprogramcodes[j].id==cleanedItr[i][2])
                            {
                                cleanedItr[i][3]=allAcademicprogramcodes[j].admissionrule;
                                cleanedItr[i][4]=allAcademicprogramcodes[j].name;
                            }
                        }
                        
                    }
                    LogicalexpressionModel.find(function (error, logicalexpressions) 
                    {
                        for (var i = 0; i < logicalexpressions.length; i++)
                        {
                            allLogicalExpressions.push(logicalexpressions[i]);
                        }
                        for(var i=0;i<cleanedItr.length;i++)
                        {
                            var holder=new Array(100);
                            var holder1=new Array(100);
                            var countHolder1=0;
                            var countOfLogicalExpressions=0;
                            for(var j=0;j<allLogicalExpressions.length;j++)
                            {
                                if(allLogicalExpressions[j].admissionrule.toString()==cleanedItr[i][3].toString())
                                {

                                    //Parse the logical expressions
                                    var splitter = allLogicalExpressions[j].booleanExp.split("");

                                    var ExpressionArray=new Array(10);
                                    var tempExpression;
                                    //console.log(splitter);
                                    var open=0;
                                    var removed=false;
                                    var hasBrackets=true;
                                    var pass=0;
                                    while(hasBrackets)
                                    {
                                        removed=false;
                                        hasBrackets=false;
                                        for(var r=0;r<splitter.length;r++)
                                        {
                                            if(splitter[r]=='('&&!removed)
                                            {
                                                splitter[r]='';
                                                removed=true;
                                                open++;
                                            }
                                            else if(splitter[r]=='(')
                                            {
                                                open++;
                                            }
                                            else if(removed&&splitter[r]==')')
                                            {
                                                open--;
                                                if(open==0)
                                                {
                                                    splitter[r]='';

                                                    //leave
                                                    r=splitter.length;
                                                    pass++;
                                                }
                                            }
                                        }
                                        //console.log("Pass:"+pass+" "+splitter.join(""));

                                        // //check if there are still brackets
                                        // for(var r=0;r<splitter.length;r++)
                                        // {
                                        //     if(splitter[r]=='('||splitter[r]==')')
                                        //     {
                                        //         hasBrackets=true;
                                        //     }

                                        // }

                                        for(var r=0;r<splitter.length;r++)
                                        {
                                            if(splitter[r]=='('||splitter[r]==')')
                                            {
                                                //done
                                                hasBrackets=true;
                                                r=splitter.length;
                                            }
                                            else if(splitter.length>r+2)
                                            {
                                                if(splitter[r]=='&'&&splitter[r+1]=='&')
                                                {
                                                    //console.log("AND ELEMENT:"+splitter.join("").substring(0,r-3));
                                                    holder1[countHolder1]=splitter.join("").substring(0,r-3);
                                                    countHolder1++;

                                                    splitter=splitter.join("").substring(r-3,splitter.length).split("");
                                                }
                                            }
                                        }
                                        if(hasBrackets==false)
                                        {
                                            //console.log("DONE ELEMENT"+splitter.join(""));
                                            holder1[countHolder1]=splitter.join("");
                                            countHolder1++;
                                        }
                                    }

                                    for(var r=0;r<countHolder1;r++)
                                    {
                                        //
                                        var toHolder=holder1[r].split("&&");
                                        for(var w=0;w<toHolder.length;w++)
                                        {
                                            if(toHolder[w].length>0)
                                            {
                                                toHolder[w]=toHolder[w].replace('(','');
                                                toHolder[w]=toHolder[w].replace(')','');
                                                if(!toHolder[w].replace(' ','').length==0)
                                                {
                                                    //console.log("TO HOLDER"+w+toHolder[w]);
                                                    holder[countOfLogicalExpressions]=toHolder[w];
                                                    countOfLogicalExpressions++;
                                                }
                                            }

                                            // holder[countOfLogicalExpressions]=toHolder[w];
                                            // countOfLogicalExpressions++;
                                        }
                                    }
                                    
                                    //holder[countOfLogicalExpressions]=allLogicalExpressions[j].booleanExp;
                                    //countOfLogicalExpressions++;
                                }
                            }
                            cleanedItr[i][5]=new Array(countOfLogicalExpressions);
                            for(var j=0;j<countOfLogicalExpressions;j++)
                            {
                                cleanedItr[i][5][j]=holder[j];
                            }
                            
                        }
                        // //print
                        // for(var i=0;i<cleanedItr.length;i++)
                        // {
                        //   console.log(cleanedItr[i]);
                        // }
                        GradeModel.find(function (error, grades) 
                        {
                            for (var i = 0; i < grades.length; i++)
                            {
                                allGrades.push(grades[i]);
                            }
                            var cleanedGrades= new Array(grades.length);
                            for(var i=0;i<allGrades.length;i++)
                            {
                              cleanedGrades[i]=new Array(3);
                              cleanedGrades[i][0]=allGrades[i].student;
                              cleanedGrades[i][1]=allGrades[i].coursecode;
                              cleanedGrades[i][2]=allGrades[i].mark;
                            }

                            // //print
                            // for(var i=0;i<cleanedGrades.length;i++)
                            // {
                            //     console.log(cleanedGrades[i]);
                            // }

                            CoursecodeModel.find(function (error, courses) 
                            {
                                for (var i = 0; i < courses.length; i++)
                                {
                                    allCourses.push(courses[i]);
                                }
                                var cleanedCourses= new Array(courses.length);

                                for(var i=0;i<allCourses.length;i++)
                                {
                                  cleanedCourses[i]=new Array(3);
                                  cleanedCourses[i][0]=allCourses[i].id;
                                  cleanedCourses[i][1]=allCourses[i].code;
                                  cleanedCourses[i][2]=allCourses[i].number;
                                }
                                // //print
                                // for(var i=0;i<cleanedCourses.length;i++)
                                // {
                                //     console.log(cleanedCourses[i]);
                                // }

                                //Now handle the students
                                for(var i=0;i<cleanedStudents.length;i++)
                                {
                                    //find the students cleanedItrlist
                                    var studentsChoice= new Array(11);
                                    var hasItr=false;
                                    for(var j=0;j<cleanedItr.length;j++)
                                    {
                                        if(cleanedStudents[i][0].toString()==cleanedItr[j][0].toString())
                                        {
                                            var rank=parseInt(cleanedItr[j][1]);
                                            studentsChoice[rank]=new Array(6);
                                            for(var p=0;p<6;p++)
                                            {
                                                studentsChoice[rank][p]=cleanedItr[j][p];
                                            }
                                            hasItr=true;
                                        }
                                    }
                                    //console.log(cleanedStudents[i][1]+": filled out intent to register?"+hasItr);
                                    if(hasItr)
                                    {
                                        var notPlaced=true;
                                        for(var q=1;q<11;q++)
                                        {
                                            if(notPlaced)
                                            {
                                                //check criteria
                                                var accepted=false;

                                                for(var l=0;l<studentsChoice[q][5].length;l++)
                                                {
                                                //     //console.log("On boolean:"+l+" - "+studentsChoice[q][5][l]);
                                                    var splitBool1=studentsChoice[q][5][l].split("||");
                                                    //console.log(splitBool1);

                                                    
                                                    //check each part of the criteria part
                                                    for(var g=0;g<splitBool1.length;g++)
                                                    {
                                                        var splitBool=splitBool1[g].split(" ");
                                                        console.log(splitBool);

                                                        //find first non empty element
                                                        var index;
                                                        for(var m=0;m<splitBool.length;m++)
                                                        {
                                                            if(splitBool[m]!="")
                                                            {
                                                                index=m;
                                                                m=splitBool.length;
                                                            }
                                                        }
                                                        var code=splitBool[index];//AVG
                                                        var operator=splitBool[index+2];//operator
                                                        var requiredMark=splitBool[index+3];
                                                        var number=splitBool[index+1];
                                                        // console.log("code "+code+"\n");
                                                        // console.log("operator "+operator+"\n");
                                                        // console.log("required "+requiredMark+"\n");
                                                        // console.log("number"+number+"\n");
                                                        //var consideration=splitBool[1];//AVG
                                                        //var studentsMark;
                                                        //var operator=splitBool[3];//operator
                                                        //var requiredMark=splitBool[4];//mark
                                                        if(code=="AVG")
                                                        {
                                                            //then just use average
                                                            studentsMark=cleanedStudents[i][2];
                                                        }
                                                        else
                                                        {
                                                            //find students grade in that course...
                                                            //console.log(splitBool);
                                                            //var code=splitBool[1];
                                                            //var number=splitBool[2];
                                                            var number1="XXXX";
                                                            //var ABcourse=false;
                                                            //console.log("Code: "+code+" - Number:"+number);
                                                            if(number.includes("A"))
                                                            {
                                                                //console.log("Includes A");
                                                                number1=number.replace("A","B");
                                                                //ABcourse=true;
                                                                //console.log(number);
                                                            }
                                                            else if(number.includes("B"))
                                                            {
                                                                //console.log("Includes B");
                                                                number1=number.replace("B","A");
                                                                //ABcourse=true;
                                                                //console.log(number);
                                                            }
                                                            //console.log("Code: "+code+" - Number:"+number1);
                                                            var courseId;
                                                            var courseId1="XXXX";

                                                            //find course id
                                                            for(var f=0;f<cleanedCourses.length;f++)
                                                            {
                                                                if(cleanedCourses[f][1]==code&&cleanedCourses[f][2]==number)
                                                                {
                                                                    courseId=cleanedCourses[f][0];
                                                                }
                                                                if(cleanedCourses[f][1]==code&&cleanedCourses[f][2]==number1)
                                                                {
                                                                    courseId1=cleanedCourses[f][0];
                                                                }
                                                            }

                                                            //find students mark
                                                            for(var f=0;f<cleanedGrades.length;f++)
                                                            {
                                                                if(cleanedGrades[f][1].toString()==courseId&&cleanedStudents[i][0].toString()==cleanedGrades[f][0].toString()||cleanedGrades[f][1].toString()==courseId1&&cleanedStudents[i][0].toString()==cleanedGrades[f][0].toString())
                                                                {
                                                                    studentsMark=cleanedGrades[f][2];
                                                                }
                                                            }
                                                        }
                                                        switch(operator)
                                                        {
                                                            case">":
                                                                if(!accepted&&l==0)
                                                                {
                                                                    if(studentsMark>requiredMark)
                                                                    {
                                                                        accepted=true;
                                                                    }
                                                                }
                                                                else if(accepted)
                                                                {
                                                                    if(studentsMark>requiredMark)
                                                                    {

                                                                    }
                                                                    else
                                                                    {
                                                                        accepted=false;
                                                                    }
                                                                }
                                                                else
                                                                {

                                                                }
                                                            break;

                                                            case">=":
                                                                if(!accepted&&l==0)
                                                                {
                                                                    if(studentsMark>=requiredMark)
                                                                    {
                                                                        accepted=true;
                                                                    }
                                                                }
                                                                else if(accepted)
                                                                {
                                                                    if(studentsMark>=requiredMark)
                                                                    {

                                                                    }
                                                                    else
                                                                    {
                                                                        accepted=false;
                                                                    }
                                                                }
                                                                else
                                                                {

                                                                }
                                                            break;

                                                            case"<":
                                                                if(!accepted&&l==0)
                                                                {
                                                                    if(studentsMark<requiredMark)
                                                                    {
                                                                        accepted=true;
                                                                    }
                                                                }
                                                                else if(accepted)
                                                                {
                                                                    if(studentsMark<requiredMark)
                                                                    {

                                                                    }
                                                                    else
                                                                    {
                                                                        accepted=false;
                                                                    }
                                                                }
                                                                else
                                                                {

                                                                }
                                                            break;

                                                            case"<=":
                                                                if(!accepted&&l==0)
                                                                {
                                                                    if(studentsMark<=requiredMark)
                                                                    {
                                                                        accepted=true;
                                                                    }
                                                                }
                                                                else if(accepted)
                                                                {
                                                                    if(studentsMark<=requiredMark)
                                                                    {
                                                                        
                                                                    }
                                                                    else
                                                                    {
                                                                        accepted=false;
                                                                    }
                                                                }
                                                                else
                                                                {

                                                                }
                                                            break;

                                                            case"=":
                                                                if(!accepted&&l==0)
                                                                {
                                                                    if(studentsMark==requiredMark)
                                                                    {
                                                                        accepted=true;
                                                                    }
                                                                }
                                                                else if(accepted)
                                                                {
                                                                    if(studentsMark==requiredMark)
                                                                    {

                                                                    }
                                                                    else
                                                                    {
                                                                        accepted=false;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    //reject
                                                                    //break
                                                                }
                                                            break;

                                                            case"!=":
                                                                if(!accepted&&l==0)
                                                                {
                                                                    if(studentsMark!=requiredMark)
                                                                    {
                                                                        accepted=true;
                                                                    }
                                                                }
                                                                else if(accepted)
                                                                {
                                                                    if(studentsMark!=requiredMark)
                                                                    {

                                                                    }
                                                                    else
                                                                    {
                                                                        accepted=false;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    //reject
                                                                    //break
                                                                }
                                                            break;
                                                        }

                                                        //One part of the Or is true move on
                                                        if(accepted==true)
                                                        {
                                                            //leave loop
                                                            g=g.length;
                                                        }
                                                    }
                                                }
                                                if(accepted)
                                                {
                                                    //returnMessage+="Student: "+cleanedStudents[i][1]+" Was placed into: "+studentsChoice[q][4]+" - choice:"+studentsChoice[q][1]+"\n";
                                                    var ProgramPlacement = new ProgramplacementModel({
                                                      academicprogramcode: studentsChoice[q][2],
                                                      distributionresult: Distributionresult,
                                                      commentcode: null,
                                                      student: cleanedStudents[i][3],
                                                      choice: studentsChoice[q][1],
                                                      override:"No"
                                                    });
                                                    ProgramPlacement.save();
                                                    notPlaced=false;
                                                }
                                            }
                                            else
                                            {
                                                break;
                                            }
                                            
                                        }
                                        if(notPlaced)
                                        {
                                            //console.log("Student: "+cleanedStudents[i][1]+" is not eligibile for any program");
                                            //returnMessage+="Student: "+cleanedStudents[i][1]+" is not eligibile for any program ("+cleanedStudents[i][2]+") \n";
                                            var ProgramPlacement = new ProgramplacementModel({
                                              academicprogramcode: null,
                                              distributionresult: Distributionresult,
                                              commentcode: null,
                                              student: cleanedStudents[i][3],
                                              choice: "INELIGIBLE",
                                              override:"No"
                                            });
                                        ProgramPlacement.save();
                                        }
                                    }
                                    else
                                    {
                                        //console.log("Student: "+cleanedStudents[i][1]+" Was not placed for due to incomplete ITR");
                                        //returnMessage+="Student: "+cleanedStudents[i][1]+" Was not placed for due to incomplete ITR ("+cleanedStudents[i][2]+") \n";
                                        var ProgramPlacement = new ProgramplacementModel({
                                          academicprogramcode: null,
                                          distributionresult: Distributionresult,
                                          commentcode: null,
                                          student: cleanedStudents[i][3],
                                          choice: "No ITR",
                                          override:"No"
                                        });
                                        ProgramPlacement.save();
                                    }
                                }

                            allStudents[0].number=returnMessage;
                            response.json({student:allStudents[0]});
                            });
                        });
                    });
                });
            });
        });
    }
    else if (number) 
    {
        StudentsModel.find({"number": number}, function (error, students) {
            if (error) response.send(error);
            response.json({student: students});
        });
    }
            
    else{
        StudentsModel.find(function (error, students) {
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
            student.cumAvg = request.body.student.cumAvg;
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
    var number = request.query.number;
    var code = request.query.code;
    if(number && code){
        CoursecodeModel.find({"number": number, "code": code}, function (error, coursecodes) {
            if (error) response.send(error);
            response.json({coursecode: coursecodes});
        });
    }
    else{
        CoursecodeModel.find(function (error, coursecodes) {
            if (error) response.send(error);
            response.json({coursecode: coursecodes});
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
//end added - COURSECODES

//added - PROGRAMRECORDS
app.route('/programrecords')
.post(function (request, response) {
    var programrecord = new ProgramrecordModel(request.body.programrecord);
    programrecord.save(function (error) {
        if (error) response.send(error);
        response.json({programrecord: programrecord});
    });
})
.get(function (request, response) {
    ProgramrecordModel.find(function (error, programrecords) {
        if (error) response.send(error);
        response.json({programrecord: programrecords});
    });
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
//end added - PROGRAMRECORDS

//added - DEGREECODES
app.route('/degreecodes')
.post(function (request, response) {
    var degreecode = new DegreecodeModel(request.body.degreecode);
    degreecode.save(function (error) {
        if (error) response.send(error);
        response.json({degreecode: degreecode});
    });
})
.get(function (request, response) {
    var name = request.query.name;
    if(name) {
        DegreecodeModel.find({"name": name}, function (error, degreecodes) {
            if (error) response.send(error);
            response.json({degreecode: degreecodes});
        });
    }
    else {
        DegreecodeModel.find(function (error, degreecodes) {
            if (error) response.send(error);
            response.json({degreecode: degreecodes});
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
//end added - DEGREECODES

//added - TERMCODES
app.route('/termcodes')
.post(function (request, response) {
    var termcode = new TermcodeModel(request.body.termcode);
    termcode.save(function (error) {
        if (error) response.send(error);
        response.json({termcode: termcode});
    });
})
.get(function (request, response) {
    var name = request.query.name;
    if(name) {
        TermcodeModel.find({"name": name}, function (error, termcodes) {
            if (error) response.send(error);
            response.json({termcode: termcodes});
        });
    }
    else {
        TermcodeModel.find(function (error, termcodes) {
            if (error) response.send(error);
            response.json({termcode: termcodes});
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
//end added - TERMCODES

//added - DISTRIBUTIONRESULTS
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
//end added - DISTRIBUTIONRESULTS

//added - COMMENTCODES
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
//end added - COMMENTCODES

app.route('/residencies')
.post(function (request, response) {
    var residency = new ResidencyModel(request.body.residency);
    residency.save(function (error) {
        if (error) response.send(error);
        response.json({residency: residency});
    });
})
.get(function (request, response) {
    var student = request.query.student;
    var name = request.query.name;

    if (student) {
        ResidencyModel.find({"student": student}, function (error, residencies) {
            if (error) response.send(error);
            response.json({residency: residencies});
        });
    }
    else if (name) {
        ResidencyModel.find({"name": name}, function (error, residencies) {
            if (error) response.send(error);
            response.json({residency: residencies});
        });
    }     
    else {
        ResidencyModel.find(function (error, residencies) {
            if (error) response.send(error);
            response.json({residency: residencies});
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
    var student = request.query.student;
    var name = request.query.name;

    if (student) {
        GenderModel.find({"student": student}, function (error, genders) {
            if (error) response.send(error);
            response.json({gender: genders});
        });
    }
    else if (name) {
        GenderModel.find({"name": name}, function (error, genders) {
            if (error) response.send(error);
            response.json({gender: genders});
        });
    }     
    else {
        GenderModel.find(function (error, genders) {
            if (error) response.send(error);
            response.json({gender: genders});
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
    var student = request.query.student;
    var name = request.query.name;

    if (student) {
        CountryModel.find({"student": student}, function (error, countries) {
            if (error) response.send(error);
            response.json({country: countries});
        });
    }
    else if (name) {
        CountryModel.find({"name": name}, function (error, countries) {
            if (error) response.send(error);
            response.json({country: countries});
        });
    }     
    else {
        CountryModel.find(function (error, countries) {
            if (error) response.send(error);
            response.json({country: countries});
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
    var student = request.query.student;
    var name = request.query.name;

    if (name) {
        ProvinceModel.find({"name": name}, function (error, provinces) {
            if (error) response.send(error);
            response.json({province: provinces});
        });
    }   
    else if (student) {
        ProvinceModel.find({"student": student}, function (error, provinces) {
            if (error) response.send(error);
            response.json({province: provinces});
        });
    }  
    else {
        ProvinceModel.find(function (error, provinces) {
            if (error) response.send(error);
            response.json({province: provinces});
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
    var student = request.query.student;
    var name = request.query.name;

    if (student) {
        CityModel.find({"student": student}, function (error, cities) {
            if (error) response.send(error);
            response.json({city: cities});
        });
    }
    else if (name) {
        CityModel.find({"name": name}, function (error, cities) {
            if (error) response.send(error);
            response.json({city: cities});
        });
    }     
    else {
        CityModel.find(function (error, cities) {
            if (error) response.send(error);
            response.json({city: cities});
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
    var student = request.query.student;
    var name = request.query.name;

    if (student) {
        AcademicloadModel.find({"student": student}, function (error, academicloads) {
            if (error) response.send(error);
            response.json({academicload: academicloads});
        });
    }
    else if (name) {
        AcademicloadModel.find({"name": name}, function (error, academicloads) {
            if (error) response.send(error);
            response.json({academicload: academicloads});
        });
    }     
    else {
        AcademicloadModel.find(function (error, academicloads) {
            if (error) response.send(error);
            response.json({academicload: academicloads});
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

//ADDED - ITRPROGRAMS
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
    var student = request.query.student;
    if(student){
        ItrprogramModel.find({"student": student}, function (error, itrprograms) {
            if (error) response.send(error);
            response.json({itrprogram: itrprograms});
        });
            }
    else {
        ItrprogramModel.find(function (error, itrprograms) {
            if (error) response.send(error);
            response.json({itrprogram: itrprograms});
        });
    } 
});

app.route('/itrprograms/:itrprogram_id')
.get(function (request, response) {
    ItrprogramModel.findById(request.params.itrprogram_id, function (error, itrprogram) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({itrprogram: itrprogram});
        }
    });
})
.put(function (request, response) {
    ItrprogramModel.findById(request.params.itrprogram_id, function (error, itrprogram) {
        if (error) {
            response.send({error: error});
        }
        else {
            itrprogram.order = request.body.itrprogram.order;
            itrprogram.eligibility = request.body.itrprogram.eligibility;
            itrprogram.student = request.body.itrprogram.student;
            itrprogram.academicprogramcode = request.body.itrprogram.academicprogramcode;
            itrprogram.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({itrprogram: itrprogram});
                }
            });
        }
    });
})
//ADDED - ACADEMICPROGRAMCODES
app.route('/academicprogramcodes')
.post(function (request, response) {
    var academicprogramcode = new AcademicprogramcodeModel(request.body.academicprogramcode);
    academicprogramcode.save(function (error) {
        if (error) response.send(error);
        response.json({academicprogramcode: academicprogramcodes});
    });
})
.get(function (request, response) {
    //var academicprogramcode = request.query.academicprogramcode;
    var name = request.query.name;
    if(name)
    {
        AcademicprogramcodeModel.find({"name":name}, function (error, academicprogramcodes) {
            if (error) response.send(error);
            response.json({academicprogramcode: academicprogramcodes});
        });
    }
    else {
        AcademicprogramcodeModel.find(function (error, academicprogramcodes) {
            if (error) response.send(error);
            response.json({academicprogramcode: academicprogramcodes});
        });
    } 
});
//END ADDED - ACADEMICPROGRAMCODES

//ADDED ALAN MARCh 23
app.route('/academicprogramcodes/:academicprogramcode_id')
.get(function (request, response) {
    AcademicprogramcodeModel.findById(request.params.academicprogramcode_id, function (error, academicprogramcode) {
        if (error) response.send(error);
        response.json({academicprogramcode: academicprogramcode});
    })
})
.put(function (request, response) {
    AcademicprogramcodeModel.findById(request.params.academicprogramcode_id, function (error, academicprogramcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            academicprogramcode.name = request.body.academicprogramcode.name;
            academicprogramcode.itrprogram = request.body.academicprogramcode.itrprogram;
            academicprogramcode.admissionrule = request.body.academicprogramcode.admissionrule;
            academicprogramcode.programadministrations = request.body.academicprogramcode.programadministrations;

            academicprogramcode.save(function (error) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.json({academicprogramcode: academicprogramcode});
                }
            });
        }
    })
})
//END ADDED

//ADDED - PROGRAMADMINISTRATIONS
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
    var name = request.query.name;

    if(department){
        ProgramadministrationModel.find({"department":department}, function (error, programadministrations) {
            if (error) response.send(error);
            response.json({programadministration: programadministrations});
        });
    }
    else if(name){
        ProgramadministrationModel.find({"name":name}, function (error, programadministrations) {
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

// ADDED -- MM
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
// END ADDED -- MM
//END ADDED - PROGRAMADMINISTRATIONS

//ADDED - DEPARTMENTS
// ADDED - MM
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
    var name = request.query.name;

    if(name){
        DepartmentModel.find({"name": name}, function (error, departments) {
            if (error) response.send(error);
            response.json({department: departments});
        });
    }
    else if(faculty){
        DepartmentModel.find({"faculty": faculty}, function (error, departments) {
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
// END ADDED -- MM

// ADDED -- MM
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
// END ADDED -- MM
//END ADDED - DEPARTMENTS

//ADDED - FACULTIES
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
    var name = request.query.name;
    if(name){
        FacultyModel.find({"name": name}, function (error, faculties) {
            if (error) response.send(error);
            response.json({faculty: faculties});
        });
    }
    else{
        FacultyModel.find(function (error, faculties) {
            if (error) response.send(error);
            response.json({faculty: faculties});
        });
    } 
});

// ADDED -- MM
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
// END ADDED -- MM
//END ADDED - FACULTIES

//ADDED - ADMISSIONRULES
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

// ADDED -- MM
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
// END ADDED -- MM
//END ADDED - ADMISSIONRULES

//ADDED - LOGICALEXPRESSIONS
// ADDED -- MM
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
// END ADDED -- MM

// ADDED -- MM
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
// END ADDED -- MM

//END ADDED - LOGICALEXPRESSIONS


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
