import { __, sprintf } from '@wordpress/i18n';
import FieldInput from './FieldInput';


export default function SectionEditor( { section, fields, onAddItem, 
	onRemoveItem, onUpdateItem, onMoveUp, onMoveDown, isFirst=false ,isLast=false } ) {
	return (
		<fieldset>
			<legend>{ section.type }</legend>
			<button type="button" onClick={onMoveUp} disabled={isFirst}
			aria-label={sprintf(__('Move %s up','resume-builder'),section.type)}>
				{__('Move Up','resume-builder')}</button>

			<button type="button" onClick={onMoveDown}disabled={isLast}
			aria-label={sprintf(__('Move %s Down','resume-builder'),section.type)}>
				{__('Move Down','resume-builder')}</button>
				
			{ section.items.map( ( item ) => (
				<div key={ item.id }>
					{ fields.map( ( field ) => (
						<FieldInput
							key={ field.key }
							field={ field }
							value={ item[ field.key ] }
							onChange={ ( value ) => {
                                onUpdateItem( item.id, field.key, value );
                                if ( field.key === 'current' && value ) {
                                    onUpdateItem( item.id, 'endDate', '' );
                                }
                            } }
                            disabled={ field.key === 'endDate' && item.current }
						/>
					) ) }
					<button type="button" onClick={ () => onRemoveItem( item.id ) }>
						{ __( 'Remove', 'resume-builder' ) }
					</button>
				</div>
			) ) }

			<button type="button" onClick={ onAddItem }>
				{ __( 'Add', 'resume-builder' ) }
			</button>
		</fieldset>
	);
}