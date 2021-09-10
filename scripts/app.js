
const optionsList = document.querySelectorAll(".option");

let selected = "";
optionsList.forEach(o => {
  o.addEventListener("click", () => {
    optionsList.forEach(o=>{
        o.querySelector("label").classList.remove("active");
    });
    selected = o.querySelector("label").innerHTML;
    document.getElementById('showSelectedAlgo').style.visibility='visible';
    document.getElementById('go').style.visibility='visible';
    document.getElementById('showSelectedAlgo').innerHTML = selected ;
    o.querySelector("label").classList.add("active");
  });
});

//change bar color while moving the slider
document.getElementById("size").oninput = function() {
  this.style.background = 'linear-gradient(to right, #84a9ac 0%, #84a9ac ' + Math.round((this.value-this.min)*100/(this.max-this.min)) + '%, #fff ' + Math.round((this.value-this.min)*100/(this.max-this.min)) + '%, white 100%)'
};
document.getElementById("speed").oninput = function() {
  this.style.background = 'linear-gradient(to right, #84a9ac 0%, #84a9ac ' + Math.round((this.value-this.min)*100/(this.max-this.min)) + '%, #fff ' + Math.round((this.value-this.min)*100/(this.max-this.min)) + '%, white 100%)'
};


//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var input_size=document.getElementById('size')
var array_size=input_size.value;
var input_go=document.getElementById("go");
var input_speed=document.getElementById("speed");
var input_stop=document.getElementById("stop");

//var array_speed=document.getElementById('a_speed').value;

var bar_heights=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

//Array generation and updation.

input_stop.addEventListener("click",generate_array);
input_go.addEventListener("click",run_algo);
input_size.addEventListener("input",update_array_size);


function generate_array()
{
    cont.innerHTML="";
    array_size=input_size.value;
    for(var i=0;i<array_size;i++)
    {
        bar_heights[i]= Math.floor(Math.random() * 0.65*(input_size.max - input_size.min) ) + 10;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:white; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (bar_heights[i]) + "%;";
    }
}

function update_array_size()
{
    array_size=input_size.value;
    generate_array();
}

window.onload=update_array_size();


function run_algo()
{
    sort_start();
  array_size=input_size.value;
    switch(selected)
    {
        case "Bubble Sort":Bubble(); //
                        break;
        case "Selection Sort":Selection_sort(); //
                        break;
        case "Insertion Sort":Insertion(); //
                        break;
        case "Merge Sort":Merge();  //
                        break;
        case "Quick Sort":Quick();  
                        break;
        case "Heap Sort":Heap(); //
                        break;
    }
}

function sort_start(){
    console.log('start');
    document.getElementById("stop").disabled=true;
    document.getElementById("size").disabled=true;
    document.getElementById("speed").disabled=true;
    document.getElementById("go").disabled=true;

}
function sort_complete(){
    console.log('end');
    document.getElementById("stop").disabled=false;
    document.getElementById("size").disabled=false;
    document.getElementById("speed").disabled=false;
    document.getElementById("go").disabled=false;
}
// Bubble Sort
function Bubble() {
  delay=0;
  var i;
  for(i=0;i<array_size-1;i++) {
      for(var j=0;j<array_size-i-1;j++) {
          div_update_no_delay(divs[j],bar_heights[j],"#f6bd60");//Color update
          div_update_no_delay(divs[j+1],bar_heights[j+1], "#f6bd60");

          if(bar_heights[j]>bar_heights[j+1]) {
              div_update(divs[j],bar_heights[j], "#f28482");//Color update
              div_update_no_delay(divs[j+1],bar_heights[j+1], "#f28482");//Color update

              var temp=bar_heights[j];
              bar_heights[j]=bar_heights[j+1];
              bar_heights[j+1]=temp;

              div_update(divs[j],bar_heights[j], "#f28482");//Height update
              div_update(divs[j+1],bar_heights[j+1], "#f28482");//Height update
          }
          div_update(divs[j],bar_heights[j], "teal");//Color update
          div_update_no_delay(divs[j+1],bar_heights[j+1], "teal");//Color update

          div_update(divs[j],bar_heights[j], "white");//Color update
      }
      
      div_update(divs[j],bar_heights[j], "teal");//Color update
  }
  div_update(divs[0],bar_heights[0], "teal","last");//Color update
}
// Heap Sort
function swap(i,j) {
  div_update(divs[i],bar_heights[i],"#f6bd60");//Color update yellows
  div_update_no_delay(divs[j],bar_heights[j],"#f6bd60");//Color update

  div_update(divs[i],bar_heights[i],"#f28482");//Color update reds
  div_update_no_delay(divs[j],bar_heights[j],"#f28482");//Color update

  var temp=bar_heights[i];
  bar_heights[i]=bar_heights[j];
  bar_heights[j]=temp;

  div_update(divs[i],bar_heights[i],"#f28482");//Height update reds
  div_update_no_delay(divs[j],bar_heights[j],"#f28482");//Height update

  div_update(divs[i],bar_heights[i],"white");//Color update
  div_update_no_delay(divs[j],bar_heights[j],"white");//Color update
}

function max_heapify(n,i) {
  var largest=i;
  var l=2*i+1;
  var r=2*i+2;

  if(l<n && bar_heights[l]>bar_heights[largest])
  {
      if(largest!=i) {
          div_update(divs[largest],bar_heights[largest],"teal");//Color update green
      }
      largest=l;
      div_update(divs[largest],bar_heights[largest],"#f28482");//Color update red
  }

  if(r<n && bar_heights[r]>bar_heights[largest]) {
      if(largest!=i) {
          div_update(divs[largest],bar_heights[largest],"teal");//Color update green
      }
      largest=r;
      div_update(divs[largest],bar_heights[largest],"#f28482");//Color update
  }

  if(largest!=i) {
      swap(i,largest);
      max_heapify(n,largest);
  }
}

function Heap() {
  delay=0;
  for(var i=Math.floor(array_size/2)-1;i>=0;i--) {
      max_heapify(array_size,i);
  }
  for(var i=array_size-1;i>0;i--) {
      swap(0,i);
      div_update(divs[i],bar_heights[i],"teal");//Color update
      div_update(divs[i],bar_heights[i],"#f6bd60");//Color update

      max_heapify(i,0);

      div_update(divs[i],bar_heights[i],"teal");//Color update
      div_update(divs[i],bar_heights[i],"teal");//Color update
  }
  div_update(divs[i],bar_heights[i],"teal","last");//Color update
}
// Insertion Sort
function Insertion() {
  delay=0;

  for(var j=0;j<array_size;j++) {
      div_update(divs[j],bar_heights[j],"#f6bd60");//Color update yellow

      var key= bar_heights[j];
      var i=j-1;
      while(i>=0 && bar_heights[i]>key) {
          div_update(divs[i],bar_heights[i],"#f28482");//Color update red
          div_update(divs[i+1],bar_heights[i+1],"#f28482");//Color update

          bar_heights[i+1]=bar_heights[i];

          div_update(divs[i],bar_heights[i],"#f28482");//Height update red
          div_update(divs[i+1],bar_heights[i+1],"#f28482");//Height update
  
          div_update(divs[i],bar_heights[i],"teal");//Color update green
          if(i==(j-1)) {
              div_update(divs[i+1],bar_heights[i+1],"#f6bd60");//Color update yellow
          }
          else{
              div_update(divs[i+1],bar_heights[i+1],"teal");//Color update green
          }
          i-=1;
      }
      bar_heights[i+1]=key;

      for(var t=0;t<j;t++) {
          div_update(divs[t],bar_heights[t],"teal");//Color update green
      }
  }
  div_update(divs[j-1],bar_heights[j-1],"teal","last");//Color update green
}
// Merge Sort
function Merge() {
    
  delay=0;
  merge_main(0,array_size-1);
}

function merge_sort(start,mid,end) {

  var l=start;
  var r=mid+1;
  var arr=[],k=0;

  for(var i=start; i<=end; i++) {

      if(l>mid) {
          arr[k++]=bar_heights[r++];
          div_update(divs[r-1],bar_heights[r-1],"#f28482");//Color update red
      }
      else if(r>end) {
          arr[k++]=bar_heights[l++];
          div_update(divs[l-1],bar_heights[l-1],"#f28482");//Color update red
      }
      else if(bar_heights[l]<bar_heights[r]) {
          arr[k++]=bar_heights[l++];
          div_update(divs[l-1],bar_heights[l-1],"#f28482");//Color update red
      }
      else {
          arr[k++]=bar_heights[r++];
          div_update(divs[r-1],bar_heights[r-1],"#f28482");//Color update red
      }
  }

  for(var t=0;t<k;t++) {
      
      bar_heights[start++]=arr[t];
      if((end+1 == t+1) && (k == input_size.value) ){
        div_update(divs[start-1],bar_heights[start-1],"teal","last");//Color update green
      } else{
        div_update(divs[start-1],bar_heights[start-1],"teal");//Color update green
      }
  }
}

function merge_main(start,end) {

  if (start < end ) {
      var mid=Math.floor((start + end) / 2);
      div_update(divs[mid],bar_heights[mid],"#f6bd60");//Color update yellow
      merge_main(start,mid);
      merge_main(mid+1,end);

      merge_sort(start,mid,end);
  }
}
// Quick Sort

function Quick()
{
    delay=0;
    quick_sort(0,array_size-1);
}

function quick_partition (start, end)
{
    var i = start + 1;
    var piv = bar_heights[start] ;//make the first element as pivot element.
    div_update(divs[start],bar_heights[start],"#f6bd60");//Color update

        for(var j =start + 1; j <= end ; j++ )
        {
            //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
            if (bar_heights[ j ] < piv)
            {
                div_update(divs[j],bar_heights[j],"#f6bd60");//Color update

                div_update(divs[i],bar_heights[i],"#f28482");//Color update
                div_update(divs[j],bar_heights[j],"#f28482");//Color update

                var temp=bar_heights[i];
                bar_heights[i]=bar_heights[j];
                bar_heights[j]=temp;

                div_update(divs[i],bar_heights[i],"#f28482");//Height update
                div_update(divs[j],bar_heights[j],"#f28482");//Height update

                div_update(divs[i],bar_heights[i],"white");//Height update
                div_update(divs[j],bar_heights[j],"white");//Height update

                i += 1;
            }
    }
    div_update(divs[start],bar_heights[start],"#f28482");//Color update
    div_update(divs[i-1],bar_heights[i-1],"#f28482");//Color update
    
    var temp=bar_heights[start];//put the pivot element in its proper place.
    bar_heights[start]=bar_heights[i-1];
    bar_heights[i-1]=temp;

    div_update(divs[start],bar_heights[start],"#f28482");//Height update
    div_update(divs[i-1],bar_heights[i-1],"#f28482");//Height update

    for(var t=start;t<=i;t++)
    {
        if((t+1 == i+1) && (i+1 == input_size.value)){
            div_update(divs[t],bar_heights[t],"teal","last");//Color update

        }else{
            div_update(divs[t],bar_heights[t],"teal");//Color update

        }
    }
    
    return i-1;//return the position of the pivot
}

function quick_sort (start, end )
{
    if( start < end )
    {
        //stores the position of pivot element
        var piv_pos = quick_partition (start, end ) ;  
        quick_sort (start, piv_pos -1);//sorts the left side of pivot.
        quick_sort (piv_pos +1, end) ;//sorts the right side of pivot.
    } 
}
// Selection Sort
function Selection_sort()
{
    delay=0;

    for(var i=0;i<array_size-1;i++)
    {
        div_update(divs[i],bar_heights[i],"#f28482");//Color update red

        min_index=i;

        for(var j=i+1;j<array_size;j++)
        {
            div_update(divs[j],bar_heights[j],"#f6bd60");//Color update yellow

            if(bar_heights[j]<bar_heights[min_index])
            {
                if(min_index!=i)
                {
                    div_update(divs[min_index],bar_heights[min_index],"white");//Color update
                }
                min_index=j;
                div_update(divs[min_index],bar_heights[min_index],"#f28482");//Color update red
            }
            else
            {
                div_update(divs[j],bar_heights[j],"white");//Color update
            }
        }
        
        if(min_index!=i)
        {
            var temp=bar_heights[min_index];
            bar_heights[min_index]=bar_heights[i];
            bar_heights[i]=temp;

            div_update(divs[min_index],bar_heights[min_index],"#f28482");//Height update red
            div_update(divs[i],bar_heights[i],"#f28482");//Height update red
            div_update(divs[min_index],bar_heights[min_index],"white");//Color update
        }
        div_update(divs[i],bar_heights[i],"teal");//Color update green
    }
    div_update(divs[i],bar_heights[i],"teal","last");//Color update green
}

// Visualization
var speed=10;

input_speed.addEventListener("input",vis_speed);

function vis_speed()
{
    var array_speed=input_speed.value;
    switch(parseInt(array_speed))
    {
        case 1: speed=1;
                break;
        case 2: speed=5;
                break;
        case 3: speed=10;
                break;
        case 4: speed=100;
                break;
        case 5: speed=3000;
                break;
    }
    
    delay_time=10000/(Math.floor(array_size/10)*speed); 
}

var delay_time=10000/(Math.floor(array_size/10)*speed);
var delay=0;

function div_update(cont,height,color,x)
{
    window.setTimeout(function(){
        cont.style=" margin:0% " + margin_size + "%; width:" + (100/array_size-(2*margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
        if(x=='last'){
            sort_complete();
        }
    },delay+=delay_time);
    
}
function div_update_no_delay(cont,height,color)
{
    window.setTimeout(function(){
        cont.style=" margin:0% " + margin_size + "%; width:" + (100/array_size-(2*margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
    },delay);
}
