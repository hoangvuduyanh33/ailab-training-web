
import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Spacer, Textarea, Flex, Select, Text, CircularProgress } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { InternalLink } from "src/components/common/InternalLink";
import ModalLayout from "src/components/common/ModalLayout";
import { submissionApi } from "src/services";
import { baseUrl } from "src/services/client";
import { userSelector } from "src/store/user";
import { fileURLToPath } from "url";

interface SubmitModalProp {
  onClose: any;
  isOpen: boolean;
  menteeId: string;
}


export const SubmitModal = (props: SubmitModalProp) => {
  const { isOpen, onClose, menteeId } = props;
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    }
  });
  console.log(acceptedFiles.length);
  const [type, setType] = useState("link");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState(0);
  const { taskId } = useParams();
  const handleSubmit = () => {
    setStatus(1);
    try {
      var formData = new FormData();
      formData.append("file", acceptedFiles[0])
      formData.append("link", (type == "link") ? link : "")
      formData.append("fileName", (type == "link") ? "" : acceptedFiles[0].name);
      formData.append("menteeId", menteeId);
      formData.append("taskId", taskId || "");
      formData.append("type", type);
      axios.post(baseUrl + "/submission", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response: any) => {
        console.log("response = ", response)
        if (response) {
          setStatus(2);
        } else {
          setStatus(3);
        }
        setTimeout(
          () => {
            setStatus(0);
            onClose();
          },
          2000
        )
      }).catch(e => {
        setStatus(3);
        setTimeout(
          () => {
            setStatus(0);
            onClose();
          },
          2000
        )
      })
    } catch (e) {
      setStatus(3);
      setTimeout(
        () => {
          setStatus(0);
          onClose();
        },
        2000
      )
    }

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
          <option value={"pdf"}>PDF file</option>
        </Select>

        {(type == "link") && <Input placeholder="Link" mt={4} borderRadius={"5px"} value={link} onChange={(event: any) => { setLink(event.target.value) }} />}
        {(type == "pdf") &&
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
        {(type == "pdf") &&
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
          <Button colorScheme="primary" onClick={handleSubmit} isLoading={(status == 1)}>
            {"Submit"}
          </Button>
        </Flex>
      </ModalFooter>
    </ModalLayout >
  )

};