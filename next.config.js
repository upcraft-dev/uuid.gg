module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    poweredByHeader: false,
    cssModules: true,
    async headers() {
        return [
            {
                source: '/(.*)', //regex: ANY path (including root URL)
                headers: [
                    {
                        key: 'X-Clacks-Overhead',
                        value: process.env.X_CLACKS_OVERHEAD_HEADER
                    }
                ]
            }
        ]
    }
}
