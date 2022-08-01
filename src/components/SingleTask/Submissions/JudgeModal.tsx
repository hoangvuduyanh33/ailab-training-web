import { Button, Input, ModalBody, ModalFooter, ModalHeader, Spacer, Textarea, Flex } from "@chakra-ui/react";
import { Stats } from "fs";
import { useState } from "react";
import { useAppSelector } from "src/app/hooks";
import { InternalLink } from "src/components/common/InternalLink";
import ModalLayout from "src/components/common/ModalLayout";
import { submissionApi } from "src/services";
import { baseUrl } from "src/services/client";
import { userSelector } from "src/store/user";

interface JudgeModalProps {
	onClose: any;
	isOpen: boolean;
	submissionId: string;
	type: string;
}

export const JudgeModal = (props: JudgeModalProps) => {
	const { isOpen, onClose, submissionId, type } = props;
	const [score, setScore] = useState("");
	const [review, setReview] = useState("");
	const { userId } = useAppSelector(userSelector);
	console.log("score = ", score, " review = ", review, " submissionId = ", submissionId, " mentorId = ", userId);
	const [status, setStatus] = useState(0);
	const onSubmit = () => {
		setStatus(1);
		submissionApi.scoring({
			submissionId: submissionId,
			mentorId: userId,
			score: +score,
			review: review,
		}).then((data) => {
			console.log(data);
			onClose();

		}).catch((e) => {
			console.log("e = ", e);
		}).finally(() => {
			console.log("something")
			onClose();
			setStatus(0);
		})
	}

	const onDownload = () => {
		fetch(`${baseUrl}/files/real?submissionId=${submissionId}`).then(response => {
			response.blob().then(blob => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.href = url;
				a.download = `${submissionId}.pdf`;
				a.click();
			})
		})
	}

	const openInNewTab = () => {
		window.open("https://www.overleaf.com/read/fzjknsdtsqfr", "_blank")
	}

	return (
		<ModalLayout isOpen={isOpen} onClose={onClose} minWidth="800px">
			<ModalHeader>
				<InternalLink href={`/mentees/${submissionId}`}>
					{submissionId}
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
					<Button colorScheme="primary" mr={2}
						onClick={(type) == "pdf" ? onDownload : openInNewTab}
					>View</Button>
					<Button colorScheme="primary" isLoading={(status == 1)} onClick={() => {
						onSubmit();
					}}>Submit</Button>
				</Flex>
			</ModalFooter>
		</ModalLayout >
	)

};
