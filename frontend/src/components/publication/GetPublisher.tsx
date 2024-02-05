import { useEffect, useState } from 'react';
import { handleGet } from '../../api/handleCall';
import { Pagination, Table } from 'antd';
import { useQuery } from 'react-query';
import '../../styles/main.css';
import toastProvider from '../../lib/toastProvider';
import { useAuth } from '../../context/AuthContext';

interface ApiResponse {
    found: boolean;
    publisher?: {
        _id: string;
        title: string;
        description: string;
        type: string;
        location: string;
        founded_at: string;
        services?: string[];
    }[];
}

interface CreatePublisherFormProps {
    refetchTrigger: boolean;
}

const GetPublisher: React.FC<CreatePublisherFormProps> = ({
    refetchTrigger,
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { getConfig } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data: useQueryPublishers, refetch } = useQuery(
        'get_publishers',
        async () => {
            const useQueryPublishers = await handleGet(
                `${BASE_URL}/api/publisher`,
                getConfig(),
            );
            if (!useQueryPublishers || !useQueryPublishers.data) {
                toastProvider(
                    'error',
                    'Une erreur est survenue pendant la récupération des Éditeurs. Veuillez réessayer.',
                    'bottom-left',
                    'colored',
                );
                return undefined;
            }
            return useQueryPublishers;
        },
    );

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };

        fetchData();
    }, [refetchTrigger, refetch]);

    console.log(
        'useQueryPublishers',
        (useQueryPublishers?.data as ApiResponse)?.publisher,
    );
    const publishers = (useQueryPublishers?.data as ApiResponse)?.publisher;
    const publishersPerPage = 10;
    const startIndex = (currentPage - 1) * publishersPerPage;
    const endIndex = startIndex + publishersPerPage;
    const currentPublishers = publishers?.slice(startIndex, endIndex);

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'title',
            width: '10%',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '30%',
            editable: true,
        },
        {
            title: 'Adresse',
            dataIndex: 'location',
            width: '10%',
            editable: true,
        },
        {
            title: 'Services',
            dataIndex: 'services',
            width: '10%',
            editable: true,
        },
        {
            title: 'Type de média',
            dataIndex: 'type',
            width: '10%',
            editable: true,
        },
        {
            title: 'Date de création',
            dataIndex: 'founded_at',
            width: '10%',
            editable: true,
        },
        {
            title: 'Actions',
            width: '10%',
            editable: true,
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <h2>Mes Éditeurs</h2>
            {currentPublishers ? (
                <>
                    <Table
                        dataSource={currentPublishers}
                        columns={columns}
                        pagination={false}
                        rowKey={(publisher) => publisher._id}
                        style={{ marginTop: '10px', width: '100%' }}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={publishersPerPage}
                        total={publishers?.length || 0}
                        onChange={(page) => setCurrentPage(page)}
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            textAlign: 'center',
                        }}
                    />
                </>
            ) : (
                <>Chargement des Éditeurs...</>
            )}
        </div>
    );
};

export default GetPublisher;
