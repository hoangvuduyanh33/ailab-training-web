import { Button, Input, ModalBody, ModalFooter, ModalHeader, Spacer, Textarea, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { InternalLink } from "src/components/common/InternalLink";
import ModalLayout from "src/components/common/ModalLayout";

interface JudgeModalProps {
	onClose: any;
	isOpen: boolean;
	menteeId: number;
}

export const JudgeModal = (props: JudgeModalProps) => {
	const { isOpen, onClose, menteeId } = props;
	const [score, setScore] = useState("");
	const [review, setReview] = useState("");
	return (
		<ModalLayout isOpen={isOpen} onClose={onClose} minWidth="800px">
			<ModalHeader>
				<InternalLink href={`/mentees/${menteeId}`}>
					{menteeId}
				</InternalLink>
			</ModalHeader>
			<ModalBody>
				<Input placeholder="Score" value={score} onChange={(event: any) => { setScore(event.target.value) }} />
				<Textarea placeholder="Add your review (optional)" bgColor={"#101010"} mt={2} onChange={(event: any) => {
					setReview(event.target.value);
				}} />
			</ModalBody>
			<ModalFooter>
				<Flex flexDir={"row"}>
					<Spacer />
					<Button colorScheme="primary" mr={2}>View</Button>
					<Button colorScheme="primary">Submit</Button>
				</Flex>
			</ModalFooter>
		</ModalLayout >
	)

};
