import { useMutation } from "@apollo/client";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiOutlineEdit } from "react-icons/ai";

import Button from "~/components/button";
import Modal from "~/components/modal";
import ToggleSwitch from "~/components/switch";
import createToast from "~/components/toast";
import { env } from "~/env";
import {
  EventByOrganizerQuery,
  EventCategory,
  UpdateEventDocument,
} from "~/generated/generated";
import { EventType } from "~/generated/generated";

const Editor = dynamic(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return mod.Editor;
  },
  { ssr: false },
);

export default function EditEventModal({
  event,
}: {
  event: EventByOrganizerQuery["eventByOrganizer"][0];
}) {
  const [maxTeams, setMaxTeams] = useState(event.maxTeams);
  const [name, setName] = useState(event.name);
  const [eventType, setEventType] = useState(event.eventType);
  const [maxTeamSize, setMaxTeamSize] = useState(event.maxTeamSize);
  const [minTeamSize, setMinTeamSize] = useState(event.minTeamSize);
  const [venue, setVenue] = useState(event.venue);
  const [fees, setFees] = useState(event.fees);
  const [banner, setBanner] = useState(event.image);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(event.category);
  function handleCloseModal() {
    setShowModal(false);
  }

  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty(),
  );

  const [updateEvent, { loading }] = useMutation(UpdateEventDocument, {
    refetchQueries: ["EventByOrganizer"],
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `${env.NEXT_PUBLIC_SERVER_URL}/cloudinary/upload/${event.name}`;
    setUploading(true);
    const promise = fetch(url, {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBanner(res.url);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
    await createToast(promise, "Uploading image...");
  };

  async function saveHandler() {
    setShowModal(false);
    const promise = updateEvent({
      variables: {
        id: event.id,
        maxTeams,
        name,
        maxTeamSize,
        minTeamSize,
        venue,
        fees,
        eventType: eventType as EventType,
        image: banner,
        category: category as EventCategory,
        description: JSON.stringify(
          convertToRaw(editorState.getCurrentContent()),
        ),
      },
    }).then((res) => {
      if (res.data?.updateEvent.__typename === "Error") {
        throw new Error(res.data.updateEvent.message);
      }
    });
    await createToast(promise, "Updating event...");
  }

  useEffect(() => {
    try {
      const editorState = JSON.parse(event.description ?? "");
      setEditorState(
        EditorState.createWithContent(convertFromRaw(editorState)),
      );
    } catch (error) {
      console.log(error);
    }
    // public-DraftStyleDefault-block
    const style = document.createElement("style");
    style.innerHTML = `.public-DraftStyleDefault-block {
      margin: 0;
    }`;

    document.head.appendChild(style);
  }, [event]);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        intent="secondary"
        disabled={event.published}
        className={
          event.published
            ? "pointer-events-none cursor-not-allowed opacity-50"
            : ""
        }
      >
        <AiOutlineEdit />
        Edit
      </Button>
      <Modal
        title="Edit Event Details"
        size="medium"
        showModal={showModal}
        onClose={handleCloseModal}
      >
        <div className="p-5">
          <div className="mt-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Event Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="block w-full rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 ring-gray-500 focus:outline-none focus:ring-2"
                placeholder="Event Name..."
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-white"
              >
                Event Description
              </label>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="bg-gray-600 p-2 rounded-md text-white"
                toolbarClassName="bg-gray-600 text-white"
              />
            </div>
            <div className="mb-6 flex flex-wrap justify-between gap-6">
              <div className="grow basis-full md:basis-1/4">
                <label
                  htmlFor="Venue"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Venue
                </label>
                <input
                  type="text"
                  id="Venue"
                  required
                  onChange={(e) => setVenue(e.target.value)}
                  value={venue ?? ""}
                  className="block w-full rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 ring-gray-500 focus:outline-none focus:ring-2"
                  placeholder="LC01"
                />
              </div>
              <div className="grow basis-full md:basis-1/4">
                <label className="mb-2 block text-sm font-medium text-white">
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="h-10 w-full rounded-lg border border-gray-600 bg-gray-600 px-4 pr-16 text-sm ring-gray-500 focus:outline-none focus:ring-2"
                >
                  {Object.values(EventType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grow basis-full md:basis-1/4">
                <label className="mb-2 block text-sm font-medium text-white">
                  Category
                </label>
                <select
                  id="category"
                  value={category as string}
                  onChange={(e) => setCategory(e.target.value as EventCategory)}
                  className="h-10 w-full rounded-lg border border-gray-600 bg-gray-600 px-4 pr-16 text-sm ring-gray-500 focus:outline-none focus:ring-2"
                >
                  {Object.values(EventCategory).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap justify-between gap-6">
              <div className="grow basis-full md:basis-1/3">
                <label
                  htmlFor="fees"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Entry Fees
                </label>
                <input
                  type="number"
                  id="fees"
                  onChange={(e) => setFees(Number(e.target.value) || 0)}
                  className="block w-full rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 ring-gray-500 focus:outline-none focus:ring-2"
                  placeholder="Entry Fees..."
                  defaultValue={event.fees}
                />
              </div>
              {(eventType === EventType.Team ||
                eventType === EventType.TeamMultipleEntry) && (
                <div className="grow basis-full md:basis-1/3">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Team Size
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="minTeamSize"
                      className="block w-full rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 ring-gray-500 focus:outline-none focus:ring-2"
                      placeholder="Min Team Size..."
                      value={minTeamSize}
                      onChange={(e) =>
                        setMinTeamSize(Number(e.target.value) || 0)
                      }
                      min={1}
                    />
                    <span className="text-white">to</span>

                    <input
                      type="number"
                      id="maxTeamSize"
                      className="block w-full rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 ring-gray-500 focus:outline-none focus:ring-2"
                      placeholder="Max Team Size..."
                      min={1}
                      value={maxTeamSize}
                      onChange={(e) =>
                        setMaxTeamSize(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6 flex flex-wrap justify-between gap-6">
              <div className="grow basis-full md:basis-1/3">
                <label className="mb-2 block text-sm font-medium text-white">
                  Banner
                </label>
                <input
                  type="file"
                  id="image"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-600 text-sm text-white placeholder-gray-400 ring-gray-500 file:mr-4 file:cursor-pointer file:rounded-md file:rounded-r-none file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 file:transition-colors hover:file:bg-blue-100 focus:outline-none focus:ring-2"
                  placeholder="Banner..."
                  onChange={async (e) =>
                    await handleUpload(e.target.files![0]!)
                  }
                />
              </div>
              <div className="grow basis-full md:basis-1/3">
                <div className="mb-2 flex items-center gap-2">
                  <label className="block text-sm font-medium text-white">
                    Teams Limit
                  </label>
                  <ToggleSwitch
                    checked={maxTeams !== null}
                    onChange={(checked) => {
                      if (checked) {
                        setMaxTeams(60);
                      } else {
                        setMaxTeams(null);
                      }
                    }}
                  />
                </div>

                {maxTeams !== null ? (
                  <input
                    type="number"
                    id="maxTeams"
                    className="block w-full rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 ring-gray-500 focus:outline-none focus:ring-2"
                    placeholder="Max Teams..."
                    min={1}
                    value={maxTeams}
                    disabled={maxTeams === null}
                    onChange={(e) => {
                      setMaxTeams(parseInt(e.target.value));
                    }}
                  />
                ) : (
                  <div className="block rounded-lg border border-gray-600 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 opacity-50 ring-gray-500 focus:outline-none focus:ring-2">
                    No Limit
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end gap-2">
            <Button
              type="submit"
              intent={"success"}
              onClick={saveHandler}
              disabled={loading || uploading}
              className="rounded-lg"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
