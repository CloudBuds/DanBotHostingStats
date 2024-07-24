createListPrem.pocketminemp = (serverName, userID) => ({
    name: serverName,
    user: userID,
    nest: 1,
    egg: 28,
    docker_image: "ghcr.io/parkervcp/yolks:debian",
    startup: "./bin/php7/bin/php ./PocketMine-MP.phar --no-wizard --disable-ansi",
    limits: {
        memory: 6144,
        swap: -1,
        disk: 0,
        io: 500,
        cpu: 0,
    },
    environment: {
        VERSION: "PM5",
    },
    feature_limits: {
        databases: 2,
        allocations: 1,
        backups: 10,
    },
    deploy: {
        locations: gamingPREM,
        dedicated_ip: false,
        port_range: [],
    },
    start_on_completion: false,
    oom_disabled: false,
});
