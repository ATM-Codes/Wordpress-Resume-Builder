import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import FieldInput from './FieldInput';
import SectionEditor from './SectionEditor.js';
import moveItem from '../utils/moveItem.js';
import createId from '../utils/createId.js';

const PERSONAL_FIELDS = [
	{ key: 'firstName', label: __( 'First Name', 'resume-builder' ) },
   	{ key: 'lastName', label: __( 'Last Name', 'resume-builder' ) }, 
	{ key: 'email', label: __( 'Email', 'resume-builder' ), type: 'email' },
	{ key: 'phone', label: __( 'Phone', 'resume-builder' ) },
    { key: 'linkedin', label: __( 'LinkedIn', 'resume-builder' ) },
    { key: 'github', label: __( 'GitHub', 'resume-builder' ) },
];

const SECTION_FIELDS = {
education:
[
    { key: 'institution', label: __( 'Institution', 'resume-builder' ) },
	{ key: 'qualification', label: __( 'Qualification', 'resume-builder' ) },
    { key: 'grade', label: __( 'Grade', 'resume-builder' ) },
    { key: 'location', label: __( 'Location', 'resume-builder' ) },
    { key: 'startDate', label: __( 'Start Date', 'resume-builder' ), type:'month' },
    { key: 'endDate', label: __( 'End Date', 'resume-builder' ), type:'month' },
],
experience:
[
    { key: 'jobTitle', label: __( 'Job Title', 'resume-builder' ) },
	{ key: 'company', label: __( 'Company', 'resume-builder' ) },
    { key: 'location', label: __( 'Location', 'resume-builder' ) },
    { key: 'startDate', label: __( 'Start Date', 'resume-builder' ), type:'month' },
    { key: 'current', label: __( 'Currently Working', 'resume-builder' ), type:'bool' },
    { key: 'endDate', label: __( 'End Date', 'resume-builder' ), type:'month' },
    { key: 'bullets', label: __( 'Highlights', 'resume-builder' ), type:'list' },
],
awards:
[
    { key: 'awardName', label: __( 'Award Name', 'resume-builder' ) },
	{ key: 'organization', label: __( 'Organization', 'resume-builder' ) },
    { key: 'dateReceived', label: __( 'Awarded Date', 'resume-builder' ), type:'month' },
    { key: 'bullets', label: __( 'Highlights', 'resume-builder' ), type:'list' },
]
};

export default function ResumeEditor( { resume, onSaved, onBack } ) {
	const [ draft, setDraft ] = useState( resume );
	const [ status, setStatus ] = useState( '' );
	const [ isSaving, setIsSaving ] = useState( false );

	function updateTitle( value ) {
		setDraft( ( current ) => ( { ...current, title: value } ) );
	}

    
	function updatePersonal( field, value ) {
		setDraft( ( current ) => ( {
			...current,
			content: {
				...current.content,
				personal: { ...current.content.personal, [ field ]: value },
			},
		} ) );
	}


    function updateSection( sectionId, change ) {
	    setDraft( ( current ) => ( {
		...current,
		content: {
			...current.content,
			sections: current.content.sections.map( ( section ) =>
				section.id === sectionId ? change( section ) : section
			),
		},
	} ) );
    }

    function addItem( sectionId ) {
        updateSection( sectionId, ( section ) => ( {
            ...section,
            items: [ ...section.items, { id: createId } ],
        } ) );
    }

    function removeItem( sectionId, itemId ) {
        updateSection( sectionId, ( section ) => ( {
            ...section,
            items: section.items.filter( ( item ) => item.id !== itemId ),
        } ) );
    }

    function updateItem( sectionId, itemId, field, value ) {
        updateSection( sectionId, ( section ) => ( {
            ...section,
            items: section.items.map( ( item ) =>
                item.id === itemId ? { ...item, [ field ]: value } : item
            ),
        } ) );
    }

	function moveSection(index,direction){
		setDraft( ( current ) => ( {
		...current,
		content: {
			...current.content,
			sections: moveItem(current.content.sections,index,index+direction),
		},
	} ) );
	}

	function handleSave() {
		setIsSaving( true );
		setStatus( '' );
		apiFetch( {
			path: `/resbuild/v1/resumes/${ draft.id }`,
			method: 'PUT',
			data: { title: draft.title, content: draft.content },
		} )
			.then( ( saved ) => {
				setDraft( saved );
				onSaved( saved );
				setStatus( __( 'Saved.', 'resume-builder' ) );
			} )
			.catch( ( err ) => setStatus( err.message ) )
			.finally( () => setIsSaving( false ) );
	}

	const personal = draft.content?.personal ?? {};
    const sections = draft.content?.sections ?? [];

	return (
        <>
		<div>
			<button type="button" onClick={ onBack }>
				{ __( 'Back to resumes', 'resume-builder' ) }
			</button>

			<label>
				{ __( 'Resume Title', 'resume-builder' ) }
				<input
					value={ draft.title }
					onChange={ ( e ) => updateTitle( e.target.value ) }
				/>
			</label>

			<fieldset>
				<legend>{__( 'Personal Details', 'resume-builder' ) }</legend>
				{ PERSONAL_FIELDS.map( ( field ) => (
                <FieldInput
                    key={ field.key }
                    field={ field }
                    value={ personal[ field.key ] }
                    onChange={ ( value ) => updatePersonal( field.key, value ) }
                />
				) ) }
			</fieldset>
            {sections.map((section,index)=>{
                const fields = SECTION_FIELDS[section.type];
                if(!fields){
                    return null;
                }
                return (
                <SectionEditor key={section.id} section={section} fields = {fields} 
                onAddItem={()=>addItem(section.id)} 
                onRemoveItem={(itemId)=>removeItem(section.id,itemId)}
                onUpdateItem={(itemId,field,value)=>updateItem(section.id, itemId, field, value)}
				onMoveUp={()=>moveSection(index,-1)}
				onMoveDown={()=>moveSection(index,1)}
				isFirst={index===0} isLast={index=== sections.length-1}
				/>
			)
            })}
            <button type="button" onClick={ handleSave } disabled={ isSaving }>
				{ isSaving ? __( 'Saving…', 'resume-builder' ) : __( 'Save', 'resume-builder' ) }
			</button>
			{ status && <p role="status">{ status }</p> }
		</div>
        </>
	);
    
}