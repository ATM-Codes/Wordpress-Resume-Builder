import { __ } from '@wordpress/i18n';


//Component that displays all the resumes

export default function ResumeList({resumes, onSelect}) {

	return (
		<ul>
			{ resumes.map( (resume) => (
				<li key={ resume.id }>
                    <button type="button" onClick={()=>onSelect(resume.id)}>
                        { resume.title }</button>
                </li>
			) ) }
		</ul>
        
	);
}