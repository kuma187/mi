//获取结点
const moods=document.querySelectorAll('.mood');
const calendar=document.getElementById('calendar');
const randomize=document.querySelector('#randomize');
const clear=document.querySelector('#clear');

//创建日历初始化变量
const currectYear=2020;
const WeekDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];

//渲染日历
const colors=['#2d6b5f','#72e3a6','#dff4c7','#edbf98','#ea3d36'];
const defluatColor='#888';
let activeColor='';

moods.forEach((mood)=>{
    mood.addEventListener('click',()=>{
        if(mood.classList.contains('selected')){
            mood.classList.remove('selected');
            activeColor=defluatColor;
        }else{
            moods.forEach((mood)=>{
                mood.classList.remove('selected');
            })
            mood.classList.add('selected'); 
            activeColor=getComputedStyle(mood).getPropertyValue('color');
        }
       

    })
})



//获取所有日期
const date=getAllDays(currectYear);

//对日期进行循环遍历

let monthHTML='';
months.forEach((months,index)=>{
    monthHTML+=`<div class="months month_${index}">
        <h3>${months}</h3>
        <div class="week_days_container">
            ${WeekDays.map((days)=>`<div class="week_days">${days}</div>`).join('')}
        </div>
        <div class="days_container"></div>
    </div>`
});
calendar.innerHTML=monthHTML;

//渲染到对应的星期
date.forEach((date)=>{
    const month=date.getMonth();
    const monthEl=document.querySelector(`.month_${month} .days_container`);
    if(date.getDate()===1 && date.getDay()!==0){
        for(let i=0;i<date.getDay();i++){
            const emptySpot=createSpot();
            monthEl.appendChild(emptySpot);
        }
    }
    const dateEl=createdateEl(date);
    monthEl.appendChild(dateEl);
})

function getAllDays(year){
    
    const firstDay=new Date(`January 1 ${year}`);
    const lastDay=new Date(`December 31 ${year}`);
    
    let lastDayInArray=firstDay;
    const days=[firstDay];
    while(lastDayInArray.getTime()!=lastDay.getTime()){
        days.push(addDays(lastDayInArray,1));
        lastDayInArray=days[days.length-1];
    }

    return days;
}

// 日期自增
function addDays(date,days){
    var result=new Date(date);
    result.setDate(result.getDate()+days);
    return result;
}

function createSpot(){
    const emptyEl=document.createElement('div');
    emptyEl.classList.add('days');
    return emptyEl;
}
function createdateEl(date){
    const day=date.getDate();
    const emptyEl=document.createElement('div');
    emptyEl.classList.add('days');
    emptyEl.innerHTML=`<span class="circle">${day}<span>`
    return emptyEl;

}

const circles=document.querySelectorAll('.circle');

circles.forEach((circle)=>{
    circle.addEventListener('click',()=>{
    circle.style.backgroundColor=activeColor;
    })
})

randomize.addEventListener('click',()=>{
    circles.forEach((circle)=>{
       
        circle.style.backgroundColor=colors[Math.floor(Math.random()*5)];
     
    })
})
clear.addEventListener('click',()=>{
    circles.forEach((circle)=>{
       
        circle.style.backgroundColor=defluatColor;
     
    })
})