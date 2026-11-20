import ResumeList from './components/ResumeList.js'
import ResumeEditor from './components/ResumeEditor.js'
import {createRoot, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import createId from './utils/createId.js';
import './app.css';

function App(){

const [ resumes, setResumes ] = useState( [] );
const [ isLoading, setIsLoading ] = useState( true );
const [ error, setError ] = useState( null );
const [selectedId,setSelectedId] = useState(null);
const [isCreating, setIsCreating]=useState(false);
const [notice,setNotice] = useState('');


useEffect( () => {
    apiFetch( { path: '/resbuild/v1/resumes' } )
        .then( ( data ) => setResumes( data ) )
        .catch( ( err ) => setError( err.message ) )
        .finally( () => setIsLoading( false ));
}, [] );

    if ( isLoading ) {
		return <p>{ __( 'Loading resumes…', 'resume-builder' ) }</p>;
	}

	if ( error ) {
		return <p role="alert">{ error }</p>;
	}



    const selected = resumes.find( ( resume ) => resume.id === selectedId );

    function handleSaved( saved ) 
	{
		setResumes( ( current ) =>
			current.map( ( resume ) => ( resume.id === saved.id ? saved : resume ) )
		);
	}

	function createResume() {
		setIsCreating(true);
		setNotice('');
		apiFetch({
			path:'/resbuild/v1/resumes',
			method:'POST',
			data:{
				title:__('Untitled Resume','resume-builder'),
				content: {
					personal:{},
					sections:['education','experience','awards'].map((type)=>({
						id:createId(),
						type,
						items: [],
					})),
				}
			}
		}).then((created)=>{
			setResumes((current)=>[created,...current]);
			setSelectedId(created.id)
		}).catch((err)=>setNotice(err.message))
		.finally(()=>setIsCreating(false));

	}

	function deleteResume(id){
		if(!window.confirm(__('Deleting this resume? This cannot be undone.','resume-builder'))){
			return;
		}
		apiFetch({
			path:`/resbuild/v1/resumes/${id}`,
			method:'DELETE',
		}).then(()=>setResumes((current)=>current
		.filter((resume)=>resume.id!==id)))
		.catch((err)=>setNotice(err.message));
	}


    if ( selected ) {
	return (
        <>
		<ResumeEditor
			key={ selected.id }
			resume={ selected }
			onSaved={ handleSaved }
			onBack={ () => setSelectedId( null ) }
		/>
        </>
	);
    }

    return (
		<div className="resbuild-app">
			<button type="button" onClick={createResume} disabled={isCreating}>
				{isCreating ? __('Creating...','resume-builder'):__('New Resume', 'resume-builder')}
			</button>
			{notice && <p role="alert">{notice}</p>}
			{resumes.length===0 ? (<p>{__('No resumes yet.','resume-builder')}</p>):(<ResumeList resumes={resumes} onSelect={setSelectedId} onDelete={deleteResume}/> )}
			</div>
	)
}

const container = document.getElementById('resume-builder-app');

if(container){
    createRoot(container).render(<App/>);
}

