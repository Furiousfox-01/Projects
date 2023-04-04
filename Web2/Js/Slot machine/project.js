// COLLECT MONEY
// GET NO OF LINES
// COLLECT BET AMOUNT
// SPIN 
// VALIDATE
// GIVE THE WON AMOUNT
// LOOP IT

const sc=require("prompt-sync")(); //like Scanner

const SYMB_COUNT ={
    A:2,
    B:4,
    C:6,
    D:8 
}
const SYMB_VAL={
    A:5,
    B:4,
    C:3,
    D:2
}
const ROW=3;
const COL=3;
const dePo=()=>{
    while(true){
    const data=sc("Enter the amount --> ");
    const a=parseInt(data);
   
    if(isNaN(a) || a<=0)
    console.log(" -X---Not a valid amount---X- \n ");
    else return a;
}
}; 

//-> similar to

/*function val(){

}*/
const nLines= ()=>{
    while(true){
        const line=sc("Enter the lines ");
        const a=parseFloat(line);
       
        if(a>0 && a<4)
         return a;

        else console.log("--X---Enter valid number---X--")
    }
}; 

const betCheck= (am,lin)=>{
    while(true){
        const line=sc("Enter the bet_amount: ");
        const a=parseFloat(line);
       
        if(a>0 && a<= am/lin)
         return a;

        else console.log("--X---Balance not sufficient---X--")
    }
}; 

const spin = () =>{
  const Sym=[];
  for (const[symb,c] of Object.entries(SYMB_COUNT))  {
    for(i=0;i<c;i++){
        Sym.push(symb);
    }
  }
  const reels=[];
  for(i=0;i<COL;i++){
    reels.push([]);
     const reelsSym=[...Sym];
    for(j=0;j<ROW;j++){
        const ranIndex=Math.floor(Math.random()*reelsSym.length);
        const selecSym=reelsSym[ranIndex];
        reels[i].push(selecSym);
        reelsSym.splice(ranIndex,1);
    }
  }
  return reels;
};

const transArray = (patt)=>{
    const trans=[];
    for(i=0;i<ROW;i++){
        trans.push([]);
        for(j=0;j<COL;j++){
            trans[i].push(patt[j][i]);
        }
    }
    return trans;
};

const printRows=(rows)=>{
  
for(const row of rows){
    let rowString="";
    for(const [i,symbol] of row.entries()){
        rowString+=symbol;
        if(i!=row.length-1){
            rowString+="|";
        }
    }
    console.log(rowString);
}
};
 
const getWin=(rows,lines,bet) =>{
    let wins=0;
    for(row=0;row<lines;row++){
        const symbols=rows[row];
        let allsame=true;
        for(const symbol of symbols){
            if(symbol !=symbols[0]){
                allsame=false;
                break;
            }
        }
        if(allsame){
            wins+=bet*SYMB_VAL[symbols[0]];
        }
    }
    return wins;
};

let bal=dePo();
const play= ()=>{
    while(true){

    console.log("you're balance is"+bal);
    const lines= nLines();
    const bet=betCheck(bal,lines);

    bal-=lines*bet;
    const patt=spin();
    const rows=transArray(patt);

    printRows(rows);

    const wins=getWin(rows,lines,bet);
    bal+=wins;
    console.log("you won --$"+wins.toString());

    const c=sc("Do you want to continue--(y/n): ")
    if(c!="y" )break;
    }
};

play();