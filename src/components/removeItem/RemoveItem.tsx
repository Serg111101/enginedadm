import './RemoveItem.scss'
let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const RemoveItem = ({ deleteItem,name, setDeletePage, id }: any) => {
  console.log(id);
  
  return (
    <div className='RemoveDiv' onClick={() => setDeletePage([-1, ''])}>

      <div className='RemoveItem'>
        <h3>{LocalValue==='AM'? 'Ուշադրություն!!!':'Attention!!!'} </h3>
        <span>{LocalValue==='AM'? 'ջնջված հատվածը ետ բերել հնարավոր չէ,համոզված եք՞ որ ցանկանում եք ջնջել այն':'the deleted section cannot be recovered, are you sure you want to delete it?'}  </span>
        <div>
          <button className='Yes' onClick={() => { deleteItem(id[0],id[1]) }}>{LocalValue==='AM'?'Այո':'Yes'}</button>
          <button onClick={() => setDeletePage([-1, ''])}>{LocalValue==='AM'?'Ոչ':'No'}</button>
        </div>
      </div>
    </div>
  )
}
