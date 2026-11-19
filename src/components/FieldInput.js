export default function FieldInput( { field, value, onChange, disabled } ) {
	if ( field.type === 'bool' ) {
		return (
			<label>
				<input
					type="checkbox"
					checked={ !! value }
					onChange={ ( e ) => onChange( e.target.checked ) }
                    disabled={disabled}
				/>
				{ field.label }
			</label>
		);
	}

	if ( field.type === 'list' ) {
		return (
			<label>
				{ field.label }
				<textarea
					value={ ( value ?? [] ).join( '\n' ) }
					onChange={ ( e ) => onChange( e.target.value.split( '\n' ) ) }
                    disabled={disabled}
				/>
			</label>
		);
	}

	return (
		<label>
			{ field.label }
			<input
				type={ field.type ?? 'text' }
				value={ value ?? '' }
				onChange={ ( e ) => onChange( e.target.value ) }
                disabled={disabled}
			/>
		</label>
	);
}