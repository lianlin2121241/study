var newclass=require('./class')

var add=function(classes) {
	classes.forEach(function(item,index) {
		console.log(item)
		newclass.add(item.teacher,item.students)
	})
}

exports.add=add