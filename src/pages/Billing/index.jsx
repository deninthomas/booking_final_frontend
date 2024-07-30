import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    HStack,
    Badge,
    Divider,
    Spinner,
    Alert,
    AlertIcon,
    Link,
} from "@chakra-ui/react";
import { getBillingHistory } from "../../serviceHandlers/services/billingAccess";
import { useNavigate } from "react-router-dom";

const BillingHistory = () => {
    const [billingHistory, setBillingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBillingHistory = async () => {
            try {
                console.log('Fetching billing history...'); 
                const result = await getBillingHistory();
                 console.log('Billing History Result:', result);
                setBillingHistory(result.response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBillingHistory();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    const onClickBilling = (id) => {
        navigate({ pathname: `/view`, search: `?id=${id}` })
    }
    return (
        <Box p={4} maxWidth="800px" mx="auto">
            <Heading as="h2" size="xl" mb={4}>
                Billing History
            </Heading>
            {billingHistory?.length > 0 ? (
                <VStack spacing={4} align="stretch">
                    {billingHistory.map((entry) => (
                        <Box key={entry.booking._id} p={4} borderWidth="1px" borderRadius="lg">
                            <HStack justify="space-between">
                                <Text fontWeight="bold">Booking ID: {entry.booking._id}</Text>
                                <Badge colorScheme="green">${entry.totalAmount}</Badge>
                            </HStack>
                            <Divider my={2} />
                            <Link fontWeight="bold" onClick={() => onClickBilling(entry.product._id)}>Place: {entry.product.name}</Link>
                            <Text>From: {new Date(entry.booking.startDate).toLocaleDateString()}</Text>
                            <Text>To: {new Date(entry.booking.endDate).toLocaleDateString()}</Text>
                            <Divider my={2} />
                            <Text>{entry.description}</Text>
                        </Box>
                    ))}
                </VStack>
            ) : (
                <Text>No billing history available.</Text>
            )}
        </Box>
    );
};

export default BillingHistory;
