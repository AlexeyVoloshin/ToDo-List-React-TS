import { Badge, Flex} from '@chakra-ui/react';

import { changeFilter } from '../../store/filterSlice';
import { useAppDispatch } from '../../hook';
import { FilterState } from '../../types';

export const Filters: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <Flex justifyContent={'space-around'} mt={4} marginBottom={5}>
            <Badge cursor={'pointer'} colorScheme={'orange'} onClick={() => dispatch(changeFilter(FilterState.all))}>All</Badge>
            <Badge cursor={'pointer'} colorScheme={'blue'} onClick={() => dispatch(changeFilter(FilterState.completed))}>Completed</Badge>
            <Badge cursor={'pointer'} colorScheme={'green'} onClick={() => dispatch(changeFilter(FilterState.active))}>Active</Badge>
        </Flex>
    );
}
