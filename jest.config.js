module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        ".*.(js)$": "babel-jest",
    },
    moduleFileExtensions: [
        "js",
        "json",
        // tell Jest to handle `*.vue` files
        "vue"
    ],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/babel-jest'
    ]
}
