import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, VStack, Text, useDisclosure } from '@chakra-ui/react';
import { FiTerminal, FiLayout } from 'react-icons/fi';
import { useEffect } from 'preact/hooks';

export const UserPreferenceDialog = ({ onSelect, isOpen, onClose }) => {
  useEffect(() => {
    // Check if user has already made a preference selection
    const userPreference = localStorage.getItem('userPreference');
    if (userPreference) {
      onSelect(userPreference);
      onClose();
    }
  }, []);

  const handleSelect = (preference) => {
    localStorage.setItem('userPreference', preference);
    onSelect(preference);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
      <ModalContent bg="gray.800" color="white" borderRadius="lg" maxW="md">
        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">
          Welcome to Kishan's Portfolio
        </ModalHeader>
        <ModalBody>
          <VStack spacing={6} py={4}>
            <Text textAlign="center" color="gray.300">
              How would you like to explore my portfolio?
            </Text>
            <VStack spacing={4} w="100%">
              <Button
                leftIcon={<FiTerminal />}
                colorScheme="teal"
                size="lg"
                w="100%"
                py={6}
                onClick={() => handleSelect('CLI')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Technical View (CLI)
              </Button>
              <Button
                leftIcon={<FiLayout />}
                colorScheme="blue"
                variant="outline"
                size="lg"
                w="100%"
                py={6}
                onClick={() => handleSelect('GUI')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  bg: 'whiteAlpha.100',
                }}
              >
                Standard View (GUI)
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center" pb={6}>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            You can switch between views anytime using the toggle in the header.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserPreferenceDialog;
