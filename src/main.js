/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from './store/store.js';

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import router from './router'

//We can create avatars here:
//https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Circle&mouthType=Eating&skinColor=Light&topType=ShortHairFrizzle

const DW_AVATAR_URL = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelRed&eyeType=Happy&eyebrowType=UnibrowNatural&mouthType=Smile&skinColor=Light';
//FIXME: Change avatars for DZ and MW
const DZ_AVATAR_URL = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=CollarSweater&clotheColor=Red&eyeType=WinkWacky&eyebrowType=RaisedExcited&mouthType=Default&skinColor=Brown';
const MW_AVATAR_URL = 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Red&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Wink&eyebrowType=Default&mouthType=Serious&skinColor=DarkBrown';
    
export default {
  DW_AVATAR_URL: DW_AVATAR_URL,
  DZ_AVATAR_URL: DZ_AVATAR_URL,
  MW_AVATAR_URL: MW_AVATAR_URL
}

const app = createApp(App)
registerPlugins(app)

app.use(router);
app.use(store);
app.mount('#app')
