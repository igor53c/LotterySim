export function generateLotteryTicket() {
    const ticket = new Set();
    while (ticket.size < 6) {
        const number = Math.floor(Math.random() * 49) + 1;
        ticket.add(number);
    }
    return Array.from(ticket);
}

export function checkIfWinner(ticket, winningNumbers) {
    const matches = ticket.filter(number => winningNumbers.includes(number));
    return matches.length;
}

export function simulateLottery(draws) {
    const userTicket = generateLotteryTicket();
    let totalWinCount = 0;
    let totalWinnings = 0;
    const drawResults = [];

    for (let i = 0; i < draws; i++) {
        const winningTicket = generateLotteryTicket();
        const matchCount = checkIfWinner(userTicket, winningTicket);
        let winAmount = 0;

        switch (matchCount) {
            case 2:
                winAmount = 10;
                totalWinCount += 1;
                break;
            case 3:
                winAmount = 50;
                totalWinCount += 1;
                break;
            case 4:
                winAmount = 100;
                totalWinCount += 1;
                break;
            case 5:
                winAmount = 10000;
                totalWinCount += 1;
                break;
            case 6:
                winAmount = 1000000;
                totalWinCount += 1;
                break;
            default:
                winAmount = 0;
        }

        totalWinnings += winAmount;
        drawResults.push({ winningTicket, matchCount, winAmount, drawNumber: i + 1 });
    }

    return {
        userTicket,
        totalWinCount,
        totalWinnings,
        draws: drawResults
    };
}
