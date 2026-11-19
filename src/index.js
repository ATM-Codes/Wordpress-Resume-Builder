import {createRoot} from '@wordpress/element'
import ResumeList from './components/ResumeList.js'

function App(){
    return <ResumeList />
}

const container = document.getElementById('resume-builder-app');

if(container){
    createRoot(container).render(<App/>);
}

