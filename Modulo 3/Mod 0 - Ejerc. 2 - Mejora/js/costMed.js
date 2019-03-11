'use strict';

function costMed(rides) {
    let costMed = 0;

    for (let ride of rides) {
        costMed += ride.cost;
    }

    return costMed = isFinite(costMed / rides.length) ? costMed / rides.length : 0;
}

export { costMed };