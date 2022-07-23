
import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Spacer, Textarea, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppSelector } from "src/app/hooks";
import { InternalLink } from "src/components/common/InternalLink";
import ModalLayout from "src/components/common/ModalLayout";
import { submissionApi } from "src/services";
import { userSelector } from "src/store/user";
import { fileURLToPath } from "url";

interface SubmitModalProp {
  onClose: any;
  isOpen: boolean;
  menteeId: string;
}


export const SubmitModal = (props: SubmitModalProp) => {
  const { isOpen, onClose, menteeId } = props;
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone();
  console.log(acceptedFiles.length);
  const [score, setScore] = useState("");
  const [review, setReview] = useState("");
  const [type, setType] = useState("link");
  const onSubmit = () => {
    submissionApi.scoring({
      score: score,
      review: review,
    })
  }
  console.log("acceptedFiles = ", acceptedFiles)
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} minWidth="800px">
      <ModalHeader>
        <InternalLink href={`/mentees/${menteeId}`}>
          Submit
        </InternalLink>
      </ModalHeader>
      <ModalBody>
        <Select value={type} onChange={(event: any) => {
          console.log("event = ", event);
          setType(event.target.value);
        }}>
          <option value={"link"}>Link</option>
          <option value={"file"}>PDF file</option>
        </Select>

        {(type == "link") && <Input placeholder="Link" mt={4} borderRadius={"5px"} value={score} onChange={(event: any) => { setScore(event.target.value) }} />}
        {(type == "file") &&
          acceptedFiles.length === 0 && <Flex width={"100%"} flexDirection="column" alignItems={"center"} bgColor="#0f0f0f" py={4} borderRadius="6px" mt={3}
            _hover={{
              outline: "1px solid #47B5FF"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps} hidden />
            <Flex flexDirection={"column"} alignItems="center" alignSelf={"center"}>
              <DownloadIcon />
              <Flex>Drop file here</Flex>
            </Flex>
          </Flex>
        }
        {(type == "file") &&
          acceptedFiles.length > 0 && <Flex width={"100%"} flexDirection="column" py={4} borderRadius="6px" mt={3}
            _hover={{
              outline: "1px solid #47B5FF"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps} hidden />
            <Flex>Selected file: </Flex>
            {acceptedFiles.map((file) => {
              return <>
                <Flex flexDir={"row"}>
                  <Text color={"whiteAlpha.500"}>File name:</Text>
                  <Text as="span" ml={2}>
                    {file.name}
                  </Text>
                  <Text ml={2} color="whiteAlpha.500">File size:</Text>
                  <Text as="span" ml={2}>
                    {(file.size / 1000000).toFixed(2)} MB
                  </Text>
                </Flex>

              </>
            })}
          </Flex>
        }
      </ModalBody>
      <ModalFooter>
        <Flex flexDir={"row"}>
          <Spacer />
          <Button colorScheme="primary" onClick={onClose}>Submit</Button>
        </Flex>
      </ModalFooter>
    </ModalLayout >
  )

};