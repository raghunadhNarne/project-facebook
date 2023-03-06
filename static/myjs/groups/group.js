$("#grpsearch").keyup(() => {
    let input = $("#grpsearch").val().toLowerCase();
    let groups = $(".globalgrps");
    for(let i=0;i<groups.length;i++){
        let grpName = groups[i].childNodes[1].childNodes[3].childNodes[1].childNodes[0].innerHTML;
        if(!grpName.toLowerCase().includes(input)){
            groups[i].style.display="none";
        }
        else{
            groups[i].style.display="block"
        }
    }
})