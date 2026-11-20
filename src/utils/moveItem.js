export default function moveItem( list,from,to ) {

    if(from<0 || from>=list.length || to<0 || to>=list.length || from === to){
        return list
    }

    const copy = [...list]
    
    const[entry] = copy.splice(from,1)

    copy.splice(to,0,entry)

    return copy
}