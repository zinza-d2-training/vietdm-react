import logo from './Assets/image/logo.svg';
import bg_left_auth from './Assets/image/bg_left_auth.png';

interface AssetsInterface {
  [key: string]: string;
}

const ListAssets: AssetsInterface = {
  logo,
  bg_left_auth
};

export default function Assets(name: keyof AssetsInterface) {
  return ListAssets[name];
}
