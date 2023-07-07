import { FormLabel } from '@mui/joy';
import {
	Box,
	IconButton,
	Stack,
	ListItemText,
	Select,
	MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { usePetCareContext } from '../context';
import { Pet } from '../types/pets';

export const FilterByPet = ({
	handleFilter,
}: {
	handleFilter: (filter: number) => void;
}) => {
	const { pets } = usePetCareContext();
	const [filter, setFilter] = useState(0);

	return (
		<Box
			display='flex'
			flexDirection='row'
			alignItems='flex-end'
		>
			<Stack>
				<FormLabel>Filtre pelo pet</FormLabel>
				<Select
					onChange={(_, e: any) => {
						setFilter(e.props.value);
					}}
					placeholder='Escolha o seu pet'
					value={filter}
					sx={{ width: '250px', height: '40px' }}
				>
					<MenuItem
						key={`pet`}
						value={0}
					>
						<ListItemText primary={'Todos'} />
					</MenuItem>
					{pets.map((pet: Pet) => {
						return (
							<MenuItem
								key={pet.id}
								value={pet.id}
							>
								<ListItemText primary={pet.name} />
							</MenuItem>
						);
					})}
				</Select>
			</Stack>

			<IconButton onClick={() => handleFilter(filter)}>
				<SearchIcon sx={{ color: 'grey' }} />
			</IconButton>
		</Box>
	);
};
