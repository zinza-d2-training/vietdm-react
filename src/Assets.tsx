import logo from './assets/images/logo.svg';
import bgLeftAuth from './assets/images/bg_left_auth.png';

const listAssets: AssetInterface = {
    logo : logo,
    bg_left_auth : bgLeftAuth
};

interface AssetInterface {
    [key: string] : string
}

function Assets(name: keyof AssetInterface) {
    return listAssets[name];
}

export default Assets;