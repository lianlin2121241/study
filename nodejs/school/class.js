var student=require('./student')
var teacher=require('./teacher')
var add=function(teacherName,studentName) {
	teacher.add(teacherName)
	studentName.forEach(function(item,index) {
		student.add(item)
	})
}
exports.add=add
//module.exports=add;