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
        egg: 67,
        docker_image: "quay.io/parkervcp/pterodactyl-images:base_debian",
        startup: `./gitea web -p {{SERVER_PORT}} -c ./app.ini`,
        limits: {
            memory: 0,
            swap: -1,
            disk: 0,
            io: 500,
            cpu: 0,
        },
        environment: {
            DISABLE_SSH: "true",
            SSH_PORT: "2020",
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
