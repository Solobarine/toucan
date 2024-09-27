import { useState } from "react";
import Button from "../../../components/settings/button";

const Notifications = () => {
  const [options, setOptions] = useState<{
    news: boolean;
    tips: boolean;
    comments: boolean;
  }>({
    news: false,
    tips: false,
    comments: false,
  });

  return (
    <section className="px-4 py-2 sm:p-2 min-h-screen">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <p className="text-sm">Customize your notifications settings</p>
      <div>
        <div className="mt-6 flex flex-col gap-3 md:grid md:grid-cols-2">
          <span>
            <p className="font-semibold">Email Notifications</p>
            <p className="text-sm">
              Get email keeping you up-to-date when you're not online
            </p>
          </span>
          <div>
            <div className="flex items-start gap-3">
              <Button
                isSelected={options.news}
                setIsSelected={() =>
                  setOptions((values) => ({ ...values, news: !values.news }))
                }
              />
              <div className="py-2">
                <p className="text-sm font-semibold">News and Updates</p>
                <p className="text-xs opacity-90">
                  News about product and feature updates
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Button
                isSelected={options.tips}
                setIsSelected={() =>
                  setOptions((values) => ({ ...values, tips: !values.tips }))
                }
              />
              <div className="py-2">
                <p className="text-sm font-semibold">Tips and Tutorials</p>
                <p className="text-xs opacity-90">
                  Get more out of Toucan with Tips and Tutorials
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Button
                isSelected={options.comments}
                setIsSelected={() =>
                  setOptions((values) => ({
                    ...values,
                    comments: !values.comments,
                  }))
                }
              />
              <div className="py-2">
                <p className="text-sm font-semibold">Comments</p>
                <p className="text-xs opacity-90">Replies to your messages</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span></span>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
