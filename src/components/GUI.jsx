import { Box, Text, Heading, Grid, VStack, useColorModeValue } from '@chakra-ui/react';
import { FiBriefcase, FiCode, FiAward, FiBookOpen } from 'react-icons/fi';

const SectionHeader = ({ icon: Icon, title }) => (
  <Heading as="h2" size="md" mb={4} display="flex" alignItems="center" color={useColorModeValue('teal.600', 'teal.300')}>
    <Icon style={{ marginRight: '0.5rem' }} />
    {title}
  </Heading>
);

const GUIPortfolio = ({ data }) => {
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const cardBg = useColorModeValue('white', 'gray.800');
    const cardHover = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
            <VStack spacing={6} mb={12} textAlign="center">
                <Box>
                    <Heading as="h1" size="2xl" fontWeight="bold" mb={2} color={textColor}>
                        {data.intro.name}
                    </Heading>
                    <Text fontSize="xl" color={useColorModeValue('teal.600', 'teal.400')}>
                        {data.intro.title}
                    </Text>
                </Box>
                <Text maxW="2xl" color={useColorModeValue('gray.600', 'gray.300')}>
                    {data.intro.summary || 'Developing scalable tech that lasts'}
                </Text>
            </VStack>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8} mb={12}>
                <Box>
                    <SectionHeader icon={FiBriefcase} title="Experience" />
                    <VStack spacing={6} align="stretch">
                        {data.experience.map((item, index) => (
                            <Box
                                key={index}
                                p={4}
                                borderRadius="lg"
                                border="1px"
                                borderColor={borderColor}
                                bg={cardBg}
                                _hover={{ bg: cardHover }}
                                transition="all 0.3s"
                            >
                                    <Text fontWeight="bold" fontSize="lg">{item.role}</Text>
                                    <Text color={useColorModeValue('teal.600', 'teal.400')}>
                                        {item.company}
                                    </Text>
                                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} mt={1}>
                                        {item.duration}
                                    </Text>
                                    {item.description && (
                                        <Text mt={2} fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>
                                            {item.description}
                                        </Text>
                                    )}
                                </Box>
                            ))}
                    </VStack>
                </Box>

                <Box>
                    <SectionHeader icon={FiCode} title="Projects" />
                    <VStack spacing={6} align="stretch">
                        {data.projects.map((item, index) => (
                            <Box
                                key={index}
                                p={4}
                                borderRadius="lg"
                                border="1px"
                                borderColor={borderColor}
                                bg={cardBg}
                                _hover={{ bg: cardHover }}
                                transition="all 0.3s"
                            >
                                    <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
                                    <Text mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                                        {item.description}
                                    </Text>
                                    {item.technologies && (
                                        <Box mt={2}>
                                            <Text fontSize="sm" fontWeight="medium" mb={1}>
                                                Technologies:
                                            </Text>
                                            <Box display="flex" flexWrap="wrap" gap={2}>
                                                {item.technologies.map((tech, i) => (
                                                    <Box
                                                        key={i}
                                                        px={2}
                                                        py={1}
                                                        bg={useColorModeValue('teal.50', 'teal.900')}
                                                        borderRadius="full"
                                                        fontSize="xs"
                                                        color={useColorModeValue('teal.700', 'teal.300')}
                                                    >
                                                        {tech}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                    </VStack>
                </Box>
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8} mt={8}>
                <Box>
                    <SectionHeader icon={FiBookOpen} title="Education" />
                    <VStack spacing={4} align="stretch">
                        {data.education.map((item, index) => (
                            <Box
                                key={index}
                                p={4}
                                borderRadius="lg"
                                border="1px"
                                borderColor={borderColor}
                                bg={cardBg}
                                _hover={{ bg: cardHover }}
                                transition="all 0.3s"
                            >
                                <Text fontWeight="bold">{item.degree}</Text>
                                <Text color={useColorModeValue('teal.600', 'teal.400')}>
                                    {item.institution}
                                </Text>
                                {item.year && (
                                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                                        {item.year}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </VStack>
                </Box>

                <Box>
                    <SectionHeader icon={FiAward} title="Skills & Achievements" />
                    <Box
                        p={4}
                        borderRadius="lg"
                        border="1px"
                        borderColor={borderColor}
                        bg={cardBg}
                        _hover={{ bg: cardHover }}
                        transition="all 0.3s"
                    >
                        {Array.isArray(data.Skills) ? (
                            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                                {data.Skills.map((skill, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        fontSize="sm"
                                        color={useColorModeValue('gray.700', 'gray.300')}
                                    >
                                        <Box
                                            as="span"
                                            display="inline-block"
                                            width="8px"
                                            height="8px"
                                            borderRadius="full"
                                            bg={useColorModeValue('teal.500', 'teal.300')}
                                            mr={2}
                                        />
                                        {skill}
                                    </Box>
                                ))}
                            </Grid>
                        ) : (
                            <Text>{data.Skills}</Text>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default GUIPortfolio;
