import Swal from "sweetalert2";

interface props{
  title:string,
  text:string,
  deleteItem:any
}

async function DeleteAll({ title, text, deleteItem }:props) {


  let LocalValue:any
  if (localStorage.getItem("language")) {
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: LocalValue === 'AM' ? "Ոչ" : 'No' ,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: LocalValue === 'AM'? 'Այո' : "Yes"  ,
  }).then(async (result) => {
    if (result?.isConfirmed) {
     await deleteItem();
    }
  });


  
}


export default DeleteAll;