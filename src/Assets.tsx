import logo from './assets/images/logo.svg';

const listAssets: Asset = {
    'logo' : logo
};

interface Asset {
    logo: string
}

function Assets(name: keyof Asset) {
    return listAssets[name];
}

export default Assets;