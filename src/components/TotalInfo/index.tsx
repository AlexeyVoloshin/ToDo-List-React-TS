import { Flex } from '@chakra-ui/react';
import { useAppSelector } from '../../hook';
import styles from './TotalInfo.module.css';

export const TotalInfo: React.FC = () => {
    const totalTodos = useAppSelector((state) => state.todos.list).length
    return  <Flex justifyContent={'space-around'} mt={4}>
        <div className={styles.totalInfo}>
            <div className={styles.lineTop} />
            <p>Total todos: <span>{totalTodos ? totalTodos : '0'}</span></p>
        </div>
    </Flex>
}