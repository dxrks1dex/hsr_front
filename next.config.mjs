/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/mihomo-api/:id',
                destination: 'https://api.mihomo.me/sr_info_parsed/:id',

            },
            {
                source: '/get-icon/:id',
                destination: 'https://github.com/Mar-7th/StarRailRes/tree/master/:id',

            },
            {
                source: '/get-clones',
                destination: 'https://api.hakush.in/hsr/data/lightcone.json'
            },
            {
                source: '/get-allCharacters',
                destination: 'https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/hsr/honker_characters.json'
            }
        ];
    },
    compiler: {
        styledComponents: true,
    }
};

export default nextConfig;
