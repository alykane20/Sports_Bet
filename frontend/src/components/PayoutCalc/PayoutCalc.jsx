const PayoutCalc = (props) => {
  
  function betCalculator(moneyLine) {
    var odds;
    var betAmount = amount_bet;   
    odds = moneyLine >= 0 ? (moneyLine / 100) + 1 : (100 / Math.abs(moneyLine)) + 1; 

    return parseFloat((odds * betAmount).toFixed(2));
}

}
// console.log(betCalculator(130)); // Result / Expected = 1150.00
// console.log(betCalculator(-130)); // Result I am getting = 115.38 // Expected = 884.62


  // To calculate “+” odds, divide the odds by 100 and multiply that product by the amount of the wager. 
  // To calculate the payout of a $50 bet on the Buffalo Bills, divide 115/100 and multiply by 
  // $50 (1.15*$50=$57.50). A winning $50 moneyline bet on the Bills returns $107.50 total to the bettor.
//   if (moneyLine >= 0) {
//     odds = (moneyLine / 100) + 1;

// } else {
//     odds = (-100 / moneyLine) + 1;


    return (
        <div></div>
      );
}
 
export default PayoutCalc;