const generatePassword = require('../src/util/generatePassword.js');

module.exports = {
    isGameServer: false,
    isDisabled: false,
    subCategory: "Software",
    createServer: createServer
}

function createServer(ServerName, UserID){
    return {
        name: ServerName,
        user: UserID,
        nest: 19,
        egg: 66,
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_17",
        startup: `sh .local/lib/code-server-{{VERSION}}/bin/code-server`,
        limits: {
            memory: 0,
            swap: -1,
            disk: 0,
            io: 500,
            cpu: 0,
        },
        environment: {
            PASSWORD: generatePassword(),
            VERSION: "latest",
        },
        feature_limits: {
            databases: 2,
            allocations: 5,
            backups: 10,
        },
        deploy: {
            locations: botswebdbPREM,
            dedicated_ip: false,
            port_range: [],
        },
        start_on_completion: false,
    };
};
