import React, { useState, useEffect } from "react";

function DayAndNight() {
    const [theme, setTheme] = useState(false);
    const handleClick=() => {
        setTheme(!theme)
    }
    useEffect(()=> { 
        if(theme==true){
            document.body.classList.add("dark");
        }else{
            document.body.classList.remove("dark");
        }
    })
    return(
        <div>
        <button onClick={handleClick}>Dark</button>
        </div>
    );
}

export default DayAndNight;