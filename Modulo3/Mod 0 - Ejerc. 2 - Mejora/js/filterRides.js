function filterRides(rides, name, value) {
    let auxRides = [];

    switch (name.toLowerCase()) {
        case 'all':
            return rides;
        case 'last':
            let init = rides.length - value;
            for (let i = init; i < rides.length; i++) {
                auxRides.push(rides[i]);
            };
            return auxRides;
        case 'scaley':
            auxRides = rides.filter(ride => ride.scale === true);
            return auxRides;
        case 'scalen':
            auxRides = rides.filter(ride => ride.scale === false);
            return auxRides;
        case 'greater':
            auxRides = rides.filter(ride => ride.cost > Number(document.getElementById('costRide').value));
            document.getElementById('costRide').value = 0;
            return auxRides;
        case 'equal':
            auxRides = rides.filter(ride => ride.cost == Number(document.getElementById('costRide').value));
            document.getElementById('costRide').value = 0;
            return auxRides;
        case 'minor':
            auxRides = rides.filter(ride => ride.cost < Number(document.getElementById('costRide').value));
            document.getElementById('costRide').value = 0;
            return auxRides;;
    }
};

export { filterRides };