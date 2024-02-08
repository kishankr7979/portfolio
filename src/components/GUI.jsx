import {
    Box,
    Text,
    Heading,
    Grid,
    GridItem,
    Icon,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';

const GUIPortfolio = ({ data }) => {
    const textColor = useColorModeValue('teal.500', 'teal.200');

    return (
        <Box
            as="section"
            bg={useColorModeValue('gray.50', 'gray.800')}
            p={4}
            rounded="md"
            shadow="md"
        >
            <VStack spacing={4} alignItems="center">
                <Heading as="h1" size="lg" textAlign="center" color={textColor}>
                    {data.intro.name}
                </Heading>
                <Text fontSize="md" color={textColor}>{data.intro.title}</Text>
            </VStack>

            <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={4}>
                <GridItem>
                    <Heading as="h2" size="md" mb={2} color={textColor}>
                        Experience
                    </Heading>
                    <Text fontSize="sm" color="gray.700">
                        {data.experience.map((item, index) => (
                            <Box key={index}>
                                <Text as="strong">{item.role}</Text> at {item.company}
                                <br />
                                <Text>{item.duration}</Text>
                            </Box>
                        ))}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Heading as="h2" size="md" mb={2} color={textColor}>
                        Projects
                    </Heading>
                    <Box fontSize="sm" color="gray.700" gap={10}>
                        {data.projects.map((item, index) => (
                            <Box key={index} gap={10}>
                                <Text as="strong" fontSize={18}>{item.name}</Text> - <Text fontSize={16}>{item.description}</Text>
                            </Box>
                        ))}
                    </Box>
                </GridItem>
                <GridItem>
                    <Heading as="h2" size="md" mb={2} color={textColor}>
                        Education
                    </Heading>
                    <Text fontSize="sm" color="gray.700">
                        {data.education.map((item, index) => (
                            <Box key={index}>
                                <Text as="strong">{item.degree}</Text> at {item.institution}
                            </Box>
                        ))}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Heading as="h2" size="md" mb={2} color={textColor}>
                        Achievements
                    </Heading>
                    <Text fontSize="sm" color="gray.700">{data.Skills}</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default GUIPortfolio;
