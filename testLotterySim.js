import { generateLotteryTicket, checkIfWinner, simulateLottery } from './LotterySim.js';

function testGenerateLotteryTicket() {
    const ticket = generateLotteryTicket();
    if (ticket.length !== 6) {
        console.error('FAILED: Lottery ticket does not contain 6 numbers');
    } else {
        const uniqueNumbers = new Set(ticket);
        if (uniqueNumbers.size !== 6) {
            console.error('FAILED: Lottery ticket contains duplicate numbers');
        } else {
            const outOfRange = ticket.some(number => number < 1 || number > 49);
            if (outOfRange) {
                console.error('FAILED: Lottery ticket contains numbers out of range (1-49)');
            } else {
                console.log('PASSED: Generate Lottery Ticket');
            }
        }
    }
}

function testCheckIfWinner() {
    const ticket = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [2, 4, 6, 8, 10, 12];
    const matches = checkIfWinner(ticket, winningNumbers);
    if (matches !== 3) {
        console.error('FAILED: Expected 3 matches but got ' + matches);
    } else {
        console.log('PASSED: Check If Winner with 3 matches');
    }

    const noMatchTicket = [7, 8, 9, 10, 11, 12];
    const noMatchCount = checkIfWinner(ticket, noMatchTicket);
    if (noMatchCount !== 0) {
        console.error('FAILED: Expected 0 matches but got ' + noMatchCount);
    } else {
        console.log('PASSED: Check If Winner with 0 matches');
    }

    const allMatchTicket = [1, 2, 3, 4, 5, 6];
    const allMatchCount = checkIfWinner(ticket, allMatchTicket);
    if (allMatchCount !== 6) {
        console.error('FAILED: Expected 6 matches but got ' + allMatchCount);
    } else {
        console.log('PASSED: Check If Winner with 6 matches');
    }
}

function testSimulateLottery() {
    const draws = 10;
    const result = simulateLottery(draws);

    if (!result.userTicket || result.userTicket.length !== 6) {
        console.error('FAILED: User ticket is not valid');
    } else if (typeof result.totalWinCount !== 'number' || result.totalWinCount < 0) {
        console.error('FAILED: Total win count is not valid');
    } else if (typeof result.totalWinnings !== 'number' || result.totalWinnings < 0) {
        console.error('FAILED: Total winnings are not valid');
    } else if (!Array.isArray(result.draws) || result.draws.length !== draws) {
        console.error('FAILED: Draw results are not valid');
    } else {
        let allDrawsValid = true;
        for (const draw of result.draws) {
            if (!Array.isArray(draw.winningTicket) || draw.winningTicket.length !== 6) {
                allDrawsValid = false;
                console.error('FAILED: A winning ticket is not valid');
                break;
            }
            if (typeof draw.matchCount !== 'number' || draw.matchCount < 0 || draw.matchCount > 6) {
                allDrawsValid = false;
                console.error('FAILED: A match count is not valid');
                break;
            }
            if (typeof draw.winAmount !== 'number' || draw.winAmount < 0) {
                allDrawsValid = false;
                console.error('FAILED: A win amount is not valid');
                break;
            }
            if (typeof draw.drawNumber !== 'number' || draw.drawNumber <= 0) {
                allDrawsValid = false;
                console.error('FAILED: Draw does not contain valid drawNumber');
                break;
            }
        }
        if (allDrawsValid) {
            console.log('PASSED: Simulate Lottery');
        }
    }
}

testGenerateLotteryTicket();
testCheckIfWinner();
testSimulateLottery();

console.log("All tests passed.");
