import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getTeachers } from "../../services/teacherService";

import TeacherHeader from "../../components/teachers/TeacherHeader";
import TeacherStats from "../../components/teachers/TeacherStats";
import TeacherToolbar from "../../components/teachers/TeacherToolbar";
import TeacherTable from "../../components/teachers/TeacherTable";


import AddTeacherModal from "../../components/teachers/AddTeacherModal";
import EditTeacherModal from "../../components/teachers/EditTeacherModal";
import DeleteTeacherModal from "../../components/teachers/DeleteTeacherModal";
import AssignCourseModal from "../../components/teachers/AssignCourseModal";
import TeacherCoursesModal from "../../components/teachers/TeacherCoursesModal";



function Teachers() {


const [teachers,setTeachers] = useState([]);

const [filteredTeachers,setFilteredTeachers] = useState([]);

const [loading,setLoading] = useState(true);



const [search,setSearch] = useState("");

const [department,setDepartment] = useState("");



const [showAdd,setShowAdd] = useState(false);

const [showEdit,setShowEdit] = useState(false);

const [showDelete,setShowDelete] = useState(false);

const [showAssign,setShowAssign] = useState(false);

const [showCourses,setShowCourses] = useState(false);



const [selectedTeacher,setSelectedTeacher] = useState(null);




useEffect(()=>{

loadTeachers();

},[]);





const loadTeachers = async()=>{


try{


setLoading(true);


const data = await getTeachers();


setTeachers(data);


setFilteredTeachers(data);



}

catch(error){


console.log(error);

alert("Failed To Load Teachers");


}

finally{


setLoading(false);


}


};





const departments = useMemo(()=>{


return [

...new Set(
teachers.map(
(t)=>t.department
)
)

];


},[teachers]);






useEffect(()=>{


let data=[...teachers];



if(search.trim()){


data=data.filter((teacher)=>

teacher.full_name
.toLowerCase()
.includes(search.toLowerCase())

||

teacher.email
.toLowerCase()
.includes(search.toLowerCase())


||

teacher.department
.toLowerCase()
.includes(search.toLowerCase())


);


}



if(department){


data=data.filter(

teacher=>

teacher.department===department

);


}



setFilteredTeachers(data);



},[search,department,teachers]);







return(


<DashboardLayout>



{/* Header */}

<TeacherHeader

onAdd={()=>setShowAdd(true)}

/>




{/* Stats */}


<TeacherStats

teachers={teachers}

/>






{/* Toolbar */}


<TeacherToolbar

search={search}

setSearch={setSearch}

department={department}

setDepartment={setDepartment}

departments={departments}

onRefresh={loadTeachers}

/>






{/* Table */}



{

loading ? (



<div className="bg-white rounded-2xl shadow-lg p-12">


<div className="flex flex-col items-center">


<div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent">

</div>



<p className="mt-5 text-gray-500 text-lg">

Loading Teachers...

</p>



</div>


</div>



)

:

(


<TeacherTable


teachers={filteredTeachers}



onEdit={(teacher)=>{

setSelectedTeacher(teacher);

setShowEdit(true);

}}



onDelete={(teacher)=>{

setSelectedTeacher(teacher);

setShowDelete(true);

}}




onAssignCourse={(teacher)=>{

setSelectedTeacher(teacher);

setShowAssign(true);

}}




onViewCourses={(teacher)=>{

setSelectedTeacher(teacher);

setShowCourses(true);

}}



/>


)

}







{/* Add Modal */}



{

showAdd && (


<AddTeacherModal

onClose={()=>setShowAdd(false)}

onSuccess={loadTeachers}

/>


)


}







{/* Edit Modal */}



{

showEdit && (


<EditTeacherModal


teacher={selectedTeacher}


onClose={()=>setShowEdit(false)}


onSuccess={loadTeachers}



/>


)


}








{/* Delete Modal */}



{

showDelete && (


<DeleteTeacherModal


teacher={selectedTeacher}


onClose={()=>setShowDelete(false)}


onSuccess={loadTeachers}


/>


)


}







{/* Assign Course */}



{

showAssign && (


<AssignCourseModal


teacher={selectedTeacher}


onClose={()=>setShowAssign(false)}



/>


)


}







{/* Teacher Courses */}



{

showCourses && (


<TeacherCoursesModal


teacher={selectedTeacher}


onClose={()=>setShowCourses(false)}


/>


)


}






</DashboardLayout>



);


}



export default Teachers;