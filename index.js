function checkCashRegister(price, cash, cid) {
    let currency = {
        "PENNY": .01,
        "NICKEL": .05,
        "DIME": .10,
        "QUARTER": .25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    }
    let totalCid = 0;
    for (let elem of cid) {
        totalCid += elem[1];
    }
    totalCid = totalCid.toFixed(2);
    let changeDue = cash - price;
    const changeArr = [];
    if (changeDue > totalCid) {
        return { status: "INSUFFICIENT_FUNDS", change: changeArr };
    } else if (changeDue.toFixed(2) === totalCid) {
        return { status: "CLOSED", change: cid };
    } else {
        cid = cid.reverse();
        cid.forEach(elem => {
            let amount = [elem[0], 0];
            while (changeDue >= currency[elem[0]] && elem[1] > 0) {
                amount[1] += currency[elem[0]];
                elem[1] -= currency[elem[0]];
                changeDue -= currency[elem[0]];
                changeDue = changeDue.toFixed(2);
            }
            if (amount[1] > 0) {
                changeArr.push(amount);
            }
        })
    }
    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: changeArr };
};